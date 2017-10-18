var express = require('express');
var ControllerImport = require('./controller/importFile/controller-import');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/import/*', function(request, response){
  var controller = new ControllerImport(request.params[0],'models/importFile/CSV/test.csv');
  controller.controllerRedirect(callback => response.json({"prestadorServico" : callback}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




