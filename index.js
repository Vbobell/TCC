var express = require('express');
var app = express();
var ControllerImport = require('./controller/importFile/controller-import');
var RouteImport = require('./controller/viewRoutes/routes-import');
var fileUpload = require('express-fileupload');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/views/pages/admin/import/*', function (request, response) {
  console.log(request.query);
  var route = new RouteImport(__dirname + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data)
      response.render(__dirname + request.path + request.query.data);
    else
      response.render(__dirname + '/views/pages/error');
  });
});

app.post('/import/*', (request, response) => {
  var controller = new ControllerImport(request.params[0], request.files.csv.data.toString('utf8').split('\r\n'));
  controller.csvInsertData(callback => {
    response.write(JSON.stringify(callback));
    response.end();
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});








