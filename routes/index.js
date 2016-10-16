const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');
const url = require('url')
const bodyParser = require('body-parser')


const TOKEN = 'weixin'

/* GET home page. */
router.get('/', function(req, res, next) {
  let urlObject = url.parse(req.url)
  let queryObject = querystring.parse(urlObject.query)
  let signature = queryObject.signature;
  let timestamp = queryObject.timestamp;
  let nonce = queryObject.nonce;
  let echostr = queryObject.echostr
  let token = TOKEN

  let tmpArr = [token,timestamp,nonce].sort();


  var shasum = crypto.createHash('sha1');
  shasum.update(tmpArr.join());
  var result = shasum.digest('hex');

  if(result == signature){
    res.send(echostr)
  }else{
    res.send(echostr)
  }


});

router.post('/',function(req,res){
  console.log("++++>:",req.header)
  res.send(req.body)
})

module.exports = router;
