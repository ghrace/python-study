const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const   SYSTEM='系统';
let socketObj={};
let mySocket={};
let msgHistory=[]
let userColor = ['#00a1f4', '#0cc', '#f44336', '#795548', '#e91e63', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#607d8b', '#ff9800', '#ff5722'];
function shuffle(arr){
    let len=arr.length;
    let random;
    while(0!==len){
        //右移位运算符向下取整
        random=(Math.random()*len--) >>>0;
        //换位置
        [arr[len],arr[random]]=[arr[random],arr[len]]
    }
    return arr;
}
io.on('connection', socket => {
    let userName;
    let color;
    let rooms=[];
    mySocket[socket.id]=socket;
    socket.on('message', msg => {
        if(userName){
            const reg=/@([^ ]+) (.+)/
            let private=msg.match(reg)
            if(private){
                let toUser=private[1];
                let content=private[2];
                let toSocket=socketObj[toUser];
                if(toSocket){
                    toSocket.send({
                        user:userName,
                        content,
                        color,
                        createAt:new Date().toLocaleString
                    })
                }
            }else{
                if(rooms.length){
                    let socketJson={};
                    rooms.forEach(room=>{
                        let roomSockets=io.sockets.adapter.rooms[room].sockets;
                        Object.keys(roomSockets).forEach(socketId=>{
                            console.log('socketId',socketId);
                            if(!socketJson[socketId]){
                                socketJson[socketId]=1
                            }
                        })
                    })
                    Object.keys(socketJson).forEach(socketId=>{
                        mySocket[socketId].emit('message',{
                            user:userName,
                            color,
                            content:msg,
                            createAt:new Date().toLocaleString()
                        })
                    })
                }else{
                    io.emit('message',{
                        user:userName,
                        color,
                        content:msg,
                        createAt:new Date().toLocaleString()
                    })
                    msgHistory.push({
                        user:userName,
                        color,
                        content:msg,
                        createAt:new Date().toLocaleString()
                    })
                }
            }
            io.emit('message', {
                user: userName,
                content: msg,
                color,
                createAt: new Date().toLocaleString()
            })
        }else{
            socketObj[userName]=socket;
            userName=msg;
            color=shuffle(userColor)[0]
            //除了自己外的所有人广播
            socket.broadcast.emit('message',{
                user:SYSTEM,
                color,
                content:`${userName}加入了聊天!`,
                createAt:new Date().toLocaleString()
            })
        }
    })
    socket.on('getHistory',()=>{
        if(msgHistory.length){
            let history=msgHistory.slice(msgHistory.length-20);
            socket.emit('history',history)
        }
    })
    socket.on('join',room =>{
        if(userName&&rooms.indexOf(room)=== -1){
            socket.join(room);
            rooms.push(room);
            socket.emit('joined',room);
            socket.send({
                user:SYSTEM,
                color,
                content:`你已加入${room}`,
                createAt:new Date().toLocaleString()
            })
        }
    })
    socket.on('leave',room=>{
        let index=rooms.indexOf(room);
        if(index!==-1){
            socket.leave(room)
            rooms.splice(index,1);
            socket.emit('leaved',room)
            socket.send({
                user:SYSTEM,
                color,
                content:`你已离开${room}`,
                createAt:new Date().toLocaleString()
            })
        }
    })
    console.log('connect');
})
server.listen(3000)