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
      time:"时间",
      ctime:
      items:[
        {
          name:'',
          number:0,
          price:0,

          note:'',
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
