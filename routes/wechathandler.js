const express = require('express')
var router = express.Router();
const respData = `<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>12345678</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[你好]]></Content>
</xml>`

function wechathandler(){
  return function(req,res){
    console.log('收到xml请求')
    res.set({
      'Content-Type':'text/xml'
    })
    res.send(respData)
  }
}

router.post('/',wechathandler())

module.exports = router
