var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var ControllerImport = require('./controller/importFile/controller-import');
var Route = require('./controller/viewRoutes/routes');
var ManageAdmin = require('./controller/manage/manage-admin');

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.use(session({ 
  secret: 'login', 
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.get('/logout', function(request, response){

});

app.get('/', function(request, response){ 
    response.render('pages/login'); 
});
 
app.get('/admin', function (request, response) {
  if (request.session.user)
    response.render('pages/admin/index');
  else
    response.redirect('/');
});

app.get('/admin/import/*', function (request, response) {
  var route = new Route(app.get('views') + '/pages' + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data)
      response.render('pages'+ request.path + request.query.data);
    else
      response.redirect('pages/error');
  });
});

app.get('/admin/select/*', function (request, response) {
  var route = new Route(app.get('controller') + '/manage' + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data){
      response.write(JSON.stringify(data));
    }
    else
      response.render('pages/error');
  });
});

app.post('/login', function(request, response){
  var manageAdmin = new ManageAdmin();
  manageAdmin.loginValidation(request.body, valid => {
    if(valid){
      request.session.user = request.body;
      let options = {
        maxAge: request.session.cookie.maxAge,
        httpOnly: true,
        signed: true
    }
      res.cookie('login', request.body.user, options);
      request.session.user = request.body.user;
      response.redirect('pages/admin');
      response.end();
    }else
      response.write('login inválido');
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

