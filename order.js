var levelup = require('levelup');
var order = levelup('order',{
    'valueEncoding':'json'
});
var dbutils = require('./dbutils');
module.exports = {,
  index_prefix:"order_",
  getKey:function(optin){

  },
  getbean: function(optin){
    var op = optin || {};
    return {
      complaty:"公司名称",
      school:"学校名称",
      date:"时间",
      ctime:0，
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

  save:function(bean){

  },

  findall:function(callback){
      dbutils.find(order,{},callback);
  }
}
