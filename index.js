var express = require('express');
var app = express();
var session = require('express-session');
var fileUpload = require('express-fileupload');
var ControllerImport = require('./controller/importFile/controller-import');
var Route = require('./controller/viewRoutes/routes');
var ManageAdmin = require('./controller/manage/manage-admin');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.use(session({
  secret: 'user',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  var manageAdmin = new ManageAdmin();
  console.log(manageAdmin.loginValidation());
  response.render('pages/login');
});

app.get('/admin', function (request, response) {

  response.render('pages/admin/index');
});

app.get('/admin/import/*', function (request, response) {
  var route = new Route(app.get('views') + '/pages' + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data)
      response.render('pages'+ request.path + request.query.data);
    else
      response.render('pages/error');
  });
});

app.get('/admin/select/*', function (request, response) {
  var route = new Route(app.get('controller') + '/manage' + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data){

      response.write();
    }
    else
      response.render('pages/error');
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








