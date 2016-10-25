const express = require('express')
const router = express.Router();
const xml2js = require('xml2js');

const rule = /(),()/

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
  return function(req,res){
    console.log('收到xml请求')

    let respData;
    const type = req.body.MsgType[0]
    const content = req.body.Content[0]
    switch(type){
      case 'text':{

      }
      default :{
        respData = buildXmlMsg(req.body)
      }
    }


    res.set({
      'Content-Type':'text/xml'
    })
    res.send(respData)
  }
}

router.post('/',wechathandler())

module.exports = router
