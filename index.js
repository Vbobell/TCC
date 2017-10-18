var express = require('express');
var ControllerImport = require('./controller/importFile/controllerImport');
var app = express();
const pool = require('./lib/db');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/import/*', function(request, response){
  var controller = new ControllerImport(request.params[0],'models/importFile/CSV/test.csv');
  controller.controllerRedirect();
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



 




