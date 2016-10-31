const express = require('express')
const router = express.Router();
const xml2js = require('xml2js');


function buildXmlMsg(obj,content){

  return `<xml>
  <ToUserName>${obj.FromUserName[0]}</ToUserName>
  <FromUserName>${obj.ToUserName[0]}</FromUserName>
  <CreateTime>${Date.now()}</CreateTime>
  <MsgType>text</MsgType>
  <Content>${content?content:'哎呀，我的蒙，你傻了吗？'}</Content>
  </xml>`
}

function wechathandler(){
  const ruleDate = [
    /(?:([1-9][0-9]{0,3})年)?([1-9][0-9]*)月([1-9][0-9]*)[日|号](上午|下午)*([1-9][0-9]{0,1})[:|：]([0-9][0-9]*)/,//2016年12月20日上午3点10分
    /(今天|明天)(上午|下午)*([1-9][0-9]{0,1})[:|：]([0-9][0-9]*)/,
  ];

  return function(req,res){

    let respData;
    const type = req.body.MsgType[0]
    const content = req.body.Content[0]
    switch(type){
      case 'text':{
        //处理发回来的文本
        let elements = content.split('，')
        if(elements.length > 1 && elements[1] != ''){
          //获取日期数据
          let date;
          let result;
          if((result = ruleDate[0].exec(elements[0]))){
            console.log("37:",result)
            result = result.slice(1,7).map(item => {
              if((~~item)){
                return parseInt(item)
              }else{
                return item
              }
            })
            if(result[3] === '下午'){
              //12小时计时方法下午时间
              result[4] = result[4] + 12;
              date = new Date(result[0],result[1],result[2],result[4],result[5],0)
            }else{
              //24小时计时方法,或者12小时计时方法上午时间

              date = new Date(elements[0],elements[1],elements[2],elements[4],element[5],0)
            }
          }else if((result = ruleDate[1].exec(elements[0]))){
            result = result.slice(1,5).map(item => {
              if((~~item)){
                return parseInt(item)
              }else{
                return item
              }

            })
            if(result[0] === '今天'){
              date = new Date()
              result[1] === '下午'?date.setHours(result[2]+12):date.setHours(result[2])
              date.setMinutes(result[3])
              date.setSeconds(0)
            }else{
              date = new Date(new Date()+24*60*60*1000)
              result[1] === '下午'?date.setHours(result[2]+12):date.setHours(result[2])
              date.setMinutes(result[3])
              date.setSeconds(0)
            }
          }
          let calenders = req.db.get('calenders')
          calenders.insert({
            name:req.body.FromUserName[0],
            date:date.getTime(),
            event:elements[1]
          }).then( result => {
            respData = buildXmlMsg(req.body,`东哥记住了，你在${date.toString()},有件事要做2：${elements[1]}`)
            ruleDate[0].exec('')
            ruleDate[1].exec('')
            res.set({
              'Content-Type':'text/xml'
            })
            res.send(respData)
          }).catch( err => {
            respData = buildXmlMsg(req.body,"嗨呀，我没记住")
            ruleDate[0].exec('')
            ruleDate[1].exec('')
            console.log("添加失败",err,respData)
            res.set({
              'Content-Type':'text/xml'
            })
            res.send(respData)

          })

        }else{
          let calenders = req.db.get('calenders')
          calenders.find({}).then((doc)=>{
            let result = doc.filter(item => {
              let time = parseInt(item.date)
              return (item.name == req.body.FromUserName[0])&&(time > Date.now())
            })
            console.log("---------------------",result)
            if(result.length > 0){
              respData = buildXmlMsg(req.body,result.map(item => item.event))
            }else{
              respData = buildXmlMsg(req.body,'事件队列为空')
            }

            res.set({
              'Content-Type':'text/xml'
            })
            res.send(respData)
          }).catch( err =>{
            console.log("-->",err)
          })
        }
        break;
      }
      default :{
        //非文字信息
        respData = buildXmlMsg(req.body)
        ruleDate[0].exec('')
        ruleDate[1].exec('')
        console.log("添加失败",err,respData)
        res.set({
          'Content-Type':'text/xml'
        })
        res.send(respData)
      }
    }


  }
}

router.post('/',wechathandler())

module.exports = router
