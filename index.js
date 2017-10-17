var express = require('express');
const pool = require('./lib/db');
var importFile = require('./models/importFile/CSV/import');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/importAdmin', function(request, response){
    var test = new importFile('models/importFile/CSV/test.csv', ',', 30);
    response.set('Content-Type', 'text/plain');
    test.returnData(data => response.json(data));
});

app.get('/admin', function(request, response){
  pool.connect( function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }

  var querySearch = 'SELECT * from admin';

  client.query(querySearch, function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    response.json({"admin" : result.rows});
  });

});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




