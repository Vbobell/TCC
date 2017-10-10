var express = require('express');
const pool = require('./lib/db');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/admin', function(request, response){
  pool.connect( function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }

  var querySearch = 'SELECT * admin';

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



 




