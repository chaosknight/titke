(function () {
    'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var Datastore = require('nedb')
var db = {};
db.order = new Datastore({ filename: 'db/order.db', autoload: true });
db.school = new Datastore({ filename: 'db/school.db', autoload: true });
db.company = new Datastore({ filename: 'db/company.db', autoload: true });
db.product = new Datastore({ filename: 'db/product.db', autoload: true });
db.unit = new Datastore({ filename: 'db/unit.db', autoload: true });



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
  db.school.find({}, function (err, docs) {
    res.send(docs);
  });
});

app.get('/api/allcompany', function (req, res) {
  db.company.find({}, function (err, docs) {
    res.send(docs);
  });
});

app.get('/api/allproduct', function (req, res) {
  db.product.find({}, function (err, docs) {
    res.send(docs);
  });
});

app.get('/api/allunit', function (req, res) {
  db.unit.find({}, function (err, docs) {
    res.send(docs);
  });
});

app.get('/api/getorder/:id',function(req,res){
  db.order.findOne({ _id: req.params.id }, function (err, doc) {
    res.send({
      value:doc
    })
  });
})

var orderafterinsert = function(newDoc){
  if(newDoc) {
    if(newDoc.complaty) {
      db.company.insert({_id:newDoc.complaty,value:newDoc.complaty},function(){})
    }
    if(newDoc.school) {
      db.school.insert({_id:newDoc.school,value:newDoc.school},function(){})
    }
    var products = [];
    var units = [];
    for(var i=0;i<newDoc.items.length;i++) {
        products.push({_id: newDoc.items[i].name, value: newDoc.items[i].name });
        units.push({_id: newDoc.items[i].unit, value: newDoc.items[i].unit });
    }
    db.product.insert(products,function(){})
    db.unit.insert(units,function(){})
  }

};



app.post('/api/saveorder', function (req, res) {





  if(req.body._id) {
    db.order.update({ _id: req.body._id},req.body,{},function (err, numReplaced){
      orderafterinsert(req.body)
      res.send({
        success:1,
        data:req.body
      });
    })
  } else {
    db.order.insert(req.body, function (err, newDoc) {
        orderafterinsert(newDoc)
        res.send({
          success:1,
          data:newDoc
        });
    });
  }

});

app.post('/api/order_query',function(req, res){

var query = {};
if(req.body.schoolname) {
  query.school = req.body.schoolname
}

if(req.body.startdate || req.body.enddate) {
  var dataqu = {};
  if(req.body.startdate) {
    dataqu.$gt = req.body.startdate;
  }

  if(req.body.enddate) {
    dataqu.$lt = req.body.enddate
  }
  query.date = dataqu;
}
var skip = req.body.skip||0;
var limit = req.body.limit || 20;

db.order.count(query, function (err, count) {
  db.order.find(query).skip(skip).limit(limit).exec(function (err, docs) {
    res.send({
      list:docs,
      tital:count
    });
  });
});
});
// const electron = require('electron')
// // Module to control application life.
// const electronapp = electron.app
app.use(express.static(process.resourcesPath + '/app/public',{
  setHeaders:function(res,path,stat) {
    if(res) {
      res.setHeader("Content-type","text/html; charset=utf-8");
    }
  }
}));
app.listen(3000, () => {});
module.exports = app;

}());
