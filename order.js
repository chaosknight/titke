var levelup = require('levelup');
var order = levelup('order',{
    'valueEncoding':'json'
});
var dbutils = require('./dbutils');
module.exports = {,

  getDb:function(){
    return order;
  },
  getbean: function(optin){
    var op = optin || {};
    return {
      complaty:"公司名称",
      school:"学校名称",
      time:0,
      items:[
        {
          name:'大米',
          number:120,
          price:54,
          unit:'袋',
          sum:'6480',
          note:''
        }
      ],
      total:0
    }
  },
  findall:function(callback){
      dbutils.find(order,{},callback);
  }
}
