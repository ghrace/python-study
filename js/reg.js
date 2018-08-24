const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
console.log(emailreg.test('11@1.com'));

const matchImgOriginRe = /<img.*?data-original="(.*?)"/g
let imgs=[]
let content='<span>ads</span><img src="https://pic2.zhimg.com/5be4f73f1e0a340ab6483cf6ac7b2ce1_b.jpg" data-rawwidth="720" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="720" data-original="https://pic2.zhimg.com/5be4f73f1e0a340ab6483cf6ac7b2ce1_r.jpg">'
content.replace(matchImgOriginRe, ($0, $1) =>{
    imgs.push($1)
    console.log($0)
})
console.log(imgs);
console.log([ ...new Set(imgs) ]);