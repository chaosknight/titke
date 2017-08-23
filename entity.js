var dbutils = require('./dbutils');
const productprefix = 'setting_product_';
const companyprefix = 'setting_company_';
const schoolprefix = 'setting_school_';
const unitprefix = 'setting_unit_';
const orderprefix = 'order_';
const orderindexprefix = 'index_';
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
    return orderindexprefix + school + '_' + date + '_' + ctime;
  },
  getindexkeydate:function(school,date,ctime){
    return orderindexprefix + date + '_' + school + '_' + ctime;
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
              { type: 'del', key: this.getindexkeydate(order.school,order.date,order.ctime) }
            );
            ops.push(
              { type: 'del', key: this.getindexkeyschool(order.school,order.date,order.ctime)}
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

  }








}
