var express = require('express');
var app = express();
var ControllerImport = require('./controller/importFile/controller-import');
var fileUpload = require('express-fileupload');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.post('/import/*', (request, response) =>{
  console.log(request.params[0]);
  var controller = new ControllerImport(request.params[0],request.files.csv.data.toString('utf8').split('\r\n'));
  controller.csvInsertData(callback => {
    response.write(JSON.stringify(request.files.csv.data.toString('utf8').split('\r\n')));
    response.end();
  });
});

app.get('/view/import/*', function(request, response){
  response.render('pages/admin/import/import-admin');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




