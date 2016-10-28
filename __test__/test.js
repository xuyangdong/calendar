var expect = require('chai').expect
var request = require('request')
var xml2js = require('xml2js')

const baseUrl = 'http://localhost:3000/'
const testUrl = `${baseUrl}?signature=44f73fe623b6c4dc62b5a7659fe34936f72048b7&echostr=6665636326900649451&timestamp=1477070056&nonce=1608825561`
const testMsg = `<xml>
 <ToUserName>xuyangdong</ToUserName>
 <FromUserName>caomengmeng</FromUserName>
 <CreateTime>1348831860</CreateTime>
 <MsgType><![CDATA[text]]></MsgType>
 <Content>今天上午3:10，我要哇哈哈</Content>
 <MsgId>1234567890123456</MsgId>
 </xml>`
 const testMsg2 = `<xml>
  <ToUserName>xuyangdong</ToUserName>
  <FromUserName>caomengmeng</FromUserName>
  <CreateTime>1348831860</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content>巴拉巴拉</Content>
  <MsgId>1234567890123456</MsgId>
  </xml>`

// describe('微信验证测试', function() {
//   it('请求的响应,应该为6665636326900649451', function(done) {
//     request.get(testUrl,function(e,r,b){
//       expect(b).to.be.equal("6665636326900649451")
//       done()
//     })
//   });
// });
//
// describe('添加时间事件',function(){
//   it('请求的响应,Content应该2016/10/26 上午1:13:15',function(done){
//     request.post({
//       url:baseUrl,
//       headers:{
//         'content-type':'text/xml'
//       },
//       body:testMsg
//     },function(e,r,b){
//       console.log("-->",b)
//       const parser = xml2js.Parser()
//       parser.parseString(b,function(err,result){
//         console.log(result)
//         expect(result.xml.Content[0]).to.be.equal('东哥记住了，你在Wed Oct 26 2016 03:10:00 GMT+0800 (CST),有件事：我要哇哈哈')
//         done()
//       })
//     })
//   })
// })
//
// describe('微信消息测试',function(){
//   it('请求的响应，ToUserName应该为xuyangdong',function(done){
//     request.post({
//       url:baseUrl,
//       headers:{
//         'content-type':'text/xml'
//       },
//       body:testMsg
//     },function(e,r,b){
//       console.log("-->",b)
//       const parser = xml2js.Parser()
//       parser.parseString(b,function(err,result){
//         console.log(result)
//         expect(result.xml.ToUserName[0]).to.be.equal('caomengmeng')
//         done()
//       })
//     })
//   })
// })
describe('查询事件测试',function(){
  it('请求的响应，ToUserName应该为caomengmeng',function(done){
    request.post({
      url:baseUrl,
      headers:{
        'content-type':'text/xml'
      },
      body:testMsg2
    },function(e,r,b){
      const parser = xml2js.Parser()
      parser.parseString(b,function(err,result){
        console.log(result)
        expect(result.xml.ToUserName[0]).to.be.equal('caomengmeng')
        done()
      })
    })
  })
})
