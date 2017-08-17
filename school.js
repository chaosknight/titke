var levelup = require('levelup');
var school = levelup('school',{
    'valueEncoding':'json'
});
var dbutils = require('./dbutils');
module.exports = {
  getDb:function(){
    return school;
  },
  getbean: function(optin){
    var op = optin || {};
    return {
      name:op.name?op.name:"",
      address:op.address?op.address:""
    }
  },
  findall:function(callback){
    dbutils.find(school,{},callback);
  }
}
