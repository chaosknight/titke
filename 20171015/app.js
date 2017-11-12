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
db.note = new Datastore({ filename: 'db/note.db', autoload: true });
db.setting = new Datastore({ filename: 'db/setting.db', autoload: true });

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Custom-Header, X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-security-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    return next();
});


app.get('/api/settingconfig',function(req,res) {
  var count = 0;
  var result = {};
  db.school.find({}, function (err, docs) {
    count++;
    result.all_schools = docs;
    if(count == 6) {
      res.send(result);
    }
  });
  db.company.find({}, function (err, docs) {
    count++;
    result.all_companys = docs;
    if(count == 6) {
      res.send(result);
    }
  });

  db.product.find({}, function (err, docs) {
    count++;
    result.all_p_names = docs;
    if(count == 6) {
      res.send(result);
    }
  });

  db.unit.find({}, function (err, docs) {
    count++;
    result.all_units = docs;
    if(count == 6) {
      res.send(result);
    }
  });

  db.note.find({}, function (err, docs) {
    count++;
    result.all_notes = docs;
    if(count == 6) {
      res.send(result);
    }
  });

  db.setting.findOne({_id:'setting_id'},function(err,docs){
    count++;
    result.settings = docs;
    if(count == 6) {
      res.send(result);
    }
  });

});

app.post('/api/delsug',function(req,res) {
  var obj = req.body;
  var _id = obj.value;
  switch (obj.type) {
    case "product":
      db.product.remove({ _id: _id }, {}, function (err, numRemoved) {
        res.send({
          numRemoved:numRemoved
          }
        )
      });
      break;
    case "unit":
      db.unit.remove({ _id: _id }, {}, function (err, numRemoved) {
        res.send({
          numRemoved:numRemoved
          }
        )
      });
      break;
    case "company":
      db.company.remove({ _id: _id }, {}, function (err, numRemoved) {
        res.send({
          numRemoved:numRemoved
          }
        )
      });
      break;
    case "school":
      db.school.remove({ _id: _id }, {}, function (err, numRemoved) {
        res.send({
          numRemoved:numRemoved
          }
        )
      });
      break;
    case "note":
      db.note.remove({ _id: _id }, {}, function (err, numRemoved) {
        res.send({
          numRemoved:numRemoved
          }
        )
      });
      break;
    default:
    res.send({
      numRemoved:0
      }
    );
  }
});


app.post('/api/savesug',function(req,res) {
  var obj = req.body;
  var _id = obj.value;
  switch (obj.type) {
    case "product":
      db.product.insert({ _id: _id,value: _id}, function () {
        res.send({})
      });
      break;
    case "unit":
      db.unit.insert({ _id: _id,value: _id}, function () {
        res.send({})
      });
      break;
    case "company":
      db.company.insert({ _id: _id,value: _id}, function () {
        res.send({})
      });
      break;
    case "school":
      db.school.insert({ _id: _id,value: _id}, function () {
        res.send({})
      });
      break;
    case "note":
      db.note.insert({ _id: _id,value: _id}, function () {
        res.send({})
      });
      break;
    default:
    res.send({
      }
    );
  }
});


app.post('/api/savesetting',function(req,res) {
  var doc = req.body;

  db.setting.update({_id:'setting_id'},doc,{},function(){
    doc._id = 'setting_id'
    db.setting.insert(doc,function(err, newDoc) {
      res.send({
        value:newDoc
      })
    })
  })
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
    if(newDoc.note) {
      db.note.insert({_id:newDoc.note,value:newDoc.note},function(){})
    }


    for(var i=0;i<newDoc.items.length;i++) {
      if(newDoc.items[i].name) {
        db.product.insert({_id: newDoc.items[i].name, value: newDoc.items[i].name },function(){})
      }
      if(newDoc.items[i].unit) {
        db.unit.insert({_id: newDoc.items[i].unit, value: newDoc.items[i].unit },function(){})
      }
    }


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

app.get('/api/order_del/:id',function(req,res){
  db.order.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
    res.send({
      numRemoved:numRemoved
      }
    )
  });
})


app.post('/api/order_query',function(req, res){

var query = {};
if(req.body.schoolname) {
  query.school = req.body.schoolname
}

if(req.body.note && req.body.note.length) {
  query.note = {$in:req.body.note};
}

if(req.body.startdate || req.body.enddate) {
  var dataqu = {};
  if(req.body.startdate) {
    dataqu.$gte = req.body.startdate;
  }

  if(req.body.enddate) {
    dataqu.$lte = req.body.enddate
  }




  query.date = dataqu;
}

  db.order.find(query).sort({date:-1}).exec(function (err, docs) {
    res.send({
      list:docs
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
