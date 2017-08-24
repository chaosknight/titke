var dbutils = require('./dbutils');
const productprefix = 'setting_product_';
const companyprefix = 'setting_company_';
const schoolprefix = 'setting_school_';
const unitprefix = 'setting_unit_';
const orderprefix = 'order_';
const orderindexprefix = 'index_';
const orderindexschool = orderindexprefix + 'school_';
const orderindexdate = orderindexprefix + 'date_';
module.exports = {
  getschoolkey:function(name){
    return schoolprefix + name;
  },
  findallschool:function(callback){
    dbutils.find(dbutils.getDb(),{
      gt:schoolprefix,
      lt:dbutils.getStringend(schoolprefix)
    },callback);
  },
  getcompanykey:function(name){
    return companyprefix + name;
  },

  findallcompany:function(callback){
    dbutils.find(dbutils.getDb(),{
      gt:companyprefix,
      lt:dbutils.getStringend(companyprefix)
    },callback);
  },
  getproductkey:function(name){
    return productprefix + name;
  },
  findallproduct:function(callback){
    dbutils.find(dbutils.getDb(),{
      gt:productprefix,
      lt:dbutils.getStringend(productprefix)
    },callback);
  },

  getunitkey:function(name){
    return unitprefix + name;
  },
  findallunit:function(callback){
    dbutils.find(dbutils.getDb(),{
      gt:unitprefix,
      lt:dbutils.getStringend(unitprefix)
    },callback);
  },
  getorderkey:function(ctime){
    return orderprefix + ctime;
  },
  getindexkeyschool:function(school,date,ctime){
    return orderindexschool + school + date + '_' + ctime;
  },
  getindexkeydate:function(school,date,ctime){
    return orderindexdate + date + school + '_' + ctime;
  },
  saveorder(order,callback){
    if(order) {
      if(!order.ctime) {
        order.ctime = new Date().getTime();
      }
      var orderkey = this.getorderkey(order.ctime)
      var ops=[];


      dbutils.getDb().get(orderkey,(err, value)=>{

        ops.push(
          { type: 'put', key: orderkey, value: order }
        );

          if (!err&&value) {
            ops.push(
              { type: 'del', key: this.getindexkeydate(value.school,value.date,value.ctime) }
            );
            ops.push(
              { type: 'del', key: this.getindexkeyschool(value.school,value.date,value.ctime)}
            );
          }

          ops.push(
            { type: 'put', key: this.getindexkeydate(order.school,order.date,order.ctime), value: orderkey }
          );
          ops.push(
            { type: 'put', key: this.getindexkeyschool(order.school,order.date,order.ctime), value: orderkey }
          );
          ops.push(
            { type: 'put', key: this.getcompanykey(order.complaty), value: order.complaty }
          );
          ops.push(
            { type: 'put', key: this.getschoolkey(order.school), value: order.school }
          );

          for(var i=0;i<order.items.length;i++) {
              ops.push(
                { type: 'put', key: this.getproductkey(order.items[i].name), value: order.items[i].name }
              );

              ops.push(
                { type: 'put', key: this.getunitkey(order.items[i].unit), value: order.items[i].unit }
              );
          }


        dbutils.getDb().batch(ops, function (err_) {
          callback(order,err_);
        })
      })
    } else {
      callback(null,{});
    }

  },

  getorder:function(id,callback){
    var key = this.getorderkey(id)
    dbutils.getDb().get(key,(err,value)=>{
      callback(err,value);
    })
  },

 findpageorder:function(param,callback){
   var prefix_ = '';
  if(param.schoolname) {
    prefix_ = orderindexschool + param.schoolname
  } else {
    prefix_ = orderindexdate + param.schoolname
  }

var find={
  gt:prefix_ + param.startdate
};

if(param.enddate) {
  find.lt = prefix_ + param.enddate
} else {
  find.lt = dbutils.getStringend(prefix_)
}

if(param.offset) {
  find.offset = param.offset;
}

if(param.limit) {
  find.limit = param.limit;
}

// async.series({
// 	one: function(callback){
// 		callback(null, 1);
// 	},
// 	two: function(callback){
// 		callback(null, 2);
// 	}
// },function(err, results) {
// 	console.log(results);
// });

   dbutils.findpage(dbutils.getDb(),find,(data_,total)=>{
     var i_ = 0;
     var result = [];
     for(var i=0;i<data_.length;i++) {
       dbutils.getDb().get(data_[i].value,function(err, value){
         i_++;
         if(!err) {
           result.push(value)
         }
         if(i_ == data_.length) {
           callback(result,total);
         }
       })
     }

   })
 }






}
