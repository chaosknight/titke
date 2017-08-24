var levelup = require('levelup');
var db = levelup('db',{
    'valueEncoding':'json'
});
// var offsetStream = require('offset-stream');
// var through      = require('ordered-through');
// var fix          = require('level-fix-range');


module.exports = {
  getDb:function(){
    return db;
  },
  getStringend:function(prefix){
    return prefix.substring(0, prefix.length - 1) + String.fromCharCode(prefix[prefix.length - 1].charCodeAt() + 1);
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
  },
  findpage:function(db,find,callback){
    console.log(find);
    var option = {keys: true, values: true, revers: false, fillCache: true};
      if(find){
        if (find.gt) {
            option.gt = find.gt;
        }
        if(find.lt) {
          option.lt = find.lt;
        }
      }
      var data_ = [];
      var total = 0;
      var offset = find.offset || 0;
      var limit = find.limit || 20;
      db.createReadStream(option).on('data',function (data) {
        if(total >=offset && total <offset + limit) {
          data_.push(data);
        }
        total ++;
      }).on('error',function (err) {
      }).on('close',function () {
      }).on('end', function () {
        if(typeof callback =='function') {
          callback(data_,total);
        }
      });
  },
//   paginate : function  (db, prefix, opts) {
//   if (!opts) opts = {};
//   if (!opts.page) opts.page = 0;
//   if (!opts.num) opts.num = 10;
//   var offset = opts.page * opts.num;
//   var limit = offset + opts.num;
//
//   return db.createKeyStream(fix({
//     reverse : true,
//     start   : prefix + '!',
//     end     : prefix + '~',
//     limit   : limit
//   }))
//   .pipe(offsetStream(offset))
//   .pipe(through(db.get.bind(db)))
// }
};
