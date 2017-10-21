var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var ControllerImport = require('./controller/importFile/controller-import');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/import/*', function(request, response){
  var controller = new ControllerImport(request.params[0],'models/importFile/CSV/test.csv');
  controller.csvInsertData(callback => response.json({"csv" : callback}));
});

app.get('/view/importAdmin', function(request, response){
  response.render('pages/admin/import/import-admin');
});

app.post('/upload', function(req, res) {
  var csv = req.files.csv;
  console.log(csv);
  csv.mv(__dirname + '/models/importFile/files/admin/' + csv.name, function(err) {
    if (err){
      return res.status(500).send(err);
    }
  });
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




