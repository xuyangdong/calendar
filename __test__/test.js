var expect = require('chai').expect
var request = require('request')


const baseUrl = 'http://localhost:3000/'
const testUrl = `${baseUrl}?signature=44f73fe623b6c4dc62b5a7659fe34936f72048b7&echostr=6665636326900649451&timestamp=1477070056&nonce=1608825561`
const testMsg = `<xml>
 <ToUserName>xuyangdong</ToUserName>
 <FromUserName><![CDATA[fromUser]]></FromUserName>
 <CreateTime>1348831860</CreateTime>
 <MsgType><![CDATA[text]]></MsgType>
 <Content><![CDATA[this is a test]]></Content>
 <MsgId>1234567890123456</MsgId>
 </xml>`

describe('微信验证测试', function() {
  it('请求的响应,应该为6665636326900649451', function(done) {
    request.get(testUrl,function(e,r,b){
      expect(b).to.be.equal("6665636326900649451")
      done()
    })
  });
});

describe('微信消息测试',function(){
  it('请求的响应，ToUserName应该为xuyangdong',function(done){
    request.post({
      url:baseUrl,
      headers:{
        'content-type':'text/xml'
      },
      body:testMsg
    },function(e,r,b){
      let info = JSON.parse(b)
      expect(info.ToUserName[0]).to.be.equal('xuyangdong')
      done()
    })
  })
})
