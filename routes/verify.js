const express = require('express')
var router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');
const url = require('url')

const TOKEN = 'weixin'

function verify(){
  return function(req,res,next){
    console.log("verify")
    let urlObject = url.parse(req.url)
    let queryObject = querystring.parse(urlObject.query)

    let signature = queryObject.signature;
    let timestamp = queryObject.timestamp;
    let nonce = queryObject.nonce;
    let echostr = queryObject.echostr
    let token = TOKEN

    let sha1sum = crypto.createHash('sha1').update([token,timestamp,nonce].sort().join('')).digest('hex')

    if(sha1sum === signature){
      console.log("success verify",echostr)
      res.send(echostr)
    }else{
      console.log("fail verify",echostr)
      res.send("")
    }

  }
}

router.get('/',verify())

module.exports = router
