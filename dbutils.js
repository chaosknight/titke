var levelup = require('levelup');
var db = levelup('db',{
    'valueEncoding':'json'
});
module.exports = {
  getDb:function(){
    return db;
  },
  find:function (db,find,callback) {
    var option = {keys: true, values: true, revers: false, fillCache: true};
      if(find){
        if (find.gt) {
            option.gt = find.gt;
        }
        if(find.lt) {
          option.lt = find.lt;
        }
        if (find.limit) {
          option.limit = find.limit;
        }
      }
      var data_ = [];
      db.createReadStream(option).on('data',function (data) {
        data_.push(data);
      }).on('error',function (err) {
      }).on('close',function () {
      }).on('end', function () {
        if(typeof callback =='function') {
          callback(data_);
        }
      });
  }
};
