const express = require('express')
var router = express.Router();

function wechathandler(){
  return function(req,res){
    console.log('收到xml请求')
    res.send(req.body)
  }
}

router.post('/',wechathandler())

module.exports = router
