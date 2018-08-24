option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            },
          formatter(params){
              let data=params[0].data;
              let res='数据名称:'+params['name']
              console.log(params)
              console.log(data)
              for (let [key,val] of Object.entries(data)){
                  console.log(key)
                  res+=key+':'+val+'<br/>'
              }
              console.log(res)
              return res
          }
        },
    series: [{
        data: [{
            value:32,
            note:'123'
        },{
            value:22,
            note:'123',
            level:1
        }],
        type: 'bar'
    }]
};

option = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip: {
      show: true,
      trigger:'item',
      axisPointer: {
          type: 'shadow'
        },
      formatter(params){
          console.log(params)
          let data=params.data;
          let res=''
          console.log(data)
          for (let [key,val] of Object.entries(data)){
              console.log(key)
              res+=key+':'+val+'<br/>'
          }
          console.log(res)
          return res
      }
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问',rank:1,note:'2343'},
                {value:310, name:'邮件营销',rank:1,note:'2343'},
                {value:234, name:'联盟广告',level:1,rank:4},
                {value:135, name:'视频广告',rank:1,note:'2343'},
                {value:1548, name:'搜索引擎',note:'1'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
