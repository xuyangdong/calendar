const express = require('express')
const router = express.Router();
const xml2js = require('xml2js');

function buildXmlMsg(obj){
  return `<xml>
  <ToUserName>${obj.FromUserName[0]}</ToUserName>
  <FromUserName>${obj.ToUserName[0]}</FromUserName>
  <CreateTime>${Date.now()}</CreateTime>
  <MsgType>text</MsgType>
  <Content>哎呀，我的蒙，你傻了吗？</Content>
  </xml>`
}

function wechathandler(){
  return function(req,res){
    console.log('收到xml请求')
    let respData = buildXmlMsg(req.body)
    console.log("-->:",respData)
    res.set({
      'Content-Type':'text/xml'
    })
    res.send(respData)
  }
}

router.post('/',wechathandler())

module.exports = router
