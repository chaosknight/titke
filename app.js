var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var entity = require('./entity');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Custom-Header, X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-security-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    return next();
});
app.get('/api/allschool', function (req, res) {
  entity.findallschool(function(list){
    res.send(list);
  });
});

app.get('/api/allcompany', function (req, res) {
  entity.findallcompany(function(list){
    res.send(list);
  });
});

app.get('/api/allproduct', function (req, res) {
  entity.findallproduct(function(list){
    res.send(list);
  });
});

app.get('/api/allunit', function (req, res) {
  entity.findallunit(function(list){
    res.send(list);
  });
});

app.get('/api/getorder/:id',function(req,res){
  var id = req.params.id;
  entity.getorder(id,function(err,value){
    if(err) {
      res.send({
      })
    } else {
      res.send({
        value:value
      })
    }

  })
})

app.post('/api/saveorder', function (req, res) {
  entity.saveorder(req.body,function(obj,err){
    if(err) {
      res.send({
        success:0,
        error:'保存失败'
      });
    } else {
      res.send({
        success:1,
        data:obj
      });
    }
  });
});

app.post('/api/order_query',function(req, res){
  entity.findpageorder(req.body,function(data,tital){
    res.send({
      list:data,
      tital:tital
    });
  });

});



app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
