var express = require('express');
var app = express();
var school = require('./school');
var schooldb = school.getDb();
school.findall(function(ary){
  console.log(ary);
})
app.get('/api/1', function (req, res) {
  db.get('name', function (err, value) {
    res.send('Hello World!' + value);
  });
});

app.use(express.static('public'));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
