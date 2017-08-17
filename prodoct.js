var levelup = require('levelup');
var prodoct = levelup('prodoct',{
    'valueEncoding':'json'
});
var dbutils = require('./dbutils');
module.exports = {,

  getDb:function(){
    return prodoct;
  },
  getbean: function(optin){
    var op = optin || {};
    return {
      name:"",
      danjia:""
    }
  },
  findall:function(callback){
      dbutils.find(prodoct,{},callback);
  }
}
