var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlBodyParser = require('./middleware/xmlBodyParser')
var mongo = require('mongodb')
var monk = require('monk')
// var db = monk('mongodb://root:OlfuhOUkqG7f2TEhdLz3VZYNR0pOIV0lblDbnZ3W@zaxkciwwkspl.mongodb.sae.sina.com.cn:10224/admin')
var db = monk('localhost:27017/calenderapp')

db.then(result => {
  console.log("result:连接成功")
  console.log("自动部署成功")
}).catch( err => {
  console.log("err:",err)
})
var routes = require('./routes/index');
var users = require('./routes/users');
var verification = require('./routes/verify');
var handleWeChatMsg = require('./routes/wechathandler')


var app = express();

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({type:'text/xml'}))
app.use(xmlBodyParser())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',function(req,res,next){
  req.db = db;
  next();
})
app.use('/', routes);
app.get('/',verification);
app.post('/',handleWeChatMsg)
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
