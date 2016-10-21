const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');
const url = require('url')


const TOKEN = 'weixin'

/* GET home page. */
router.use('/',function(req,res,next){
  console.log("a request has coming")
  next()
})

module.exports = router;
