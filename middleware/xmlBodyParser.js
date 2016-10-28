const parseString = require('xml2js').parseString;

function xmlBodyParser(){
  return function(req,res,next){
    if(req.get('content-type')!='text/xml')  {next(); return}
    let tem = parseString(req.body,function(err,result){
      if(err){
        next(err)
        return
      }else{
        req.body = result.xml
        next()
        return
      }
    })
  }
}

module.exports = xmlBodyParser
