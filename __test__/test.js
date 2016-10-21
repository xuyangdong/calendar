var expect = require('chai').expect
var request = require('request')

const testUrl = 'http://localhost:3000/?signature=44f73fe623b6c4dc62b5a7659fe34936f72048b7&echostr=6665636326900649451&timestamp=1477070056&nonce=1608825561'

describe('微信验证测试', function() {
  it('请求的响应,应该为6665636326900649451', function(done) {
    request.get(testUrl,function(e,r,b){
      expect(b).to.be.equal("6665636326900649451")
      done()
    })
  });
});
