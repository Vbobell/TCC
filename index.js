const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const Route = require('./controller/viewRoutes/routes');
const ControllerManage = require('./controller/manage/controller-manage');
const ControllerImport = require('./controller/importFile/controller-import');
const ManageAdmin = require('./controller/manage/manage-admin');

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
app.get('/', function(request, response){ 
  response.render('pages/login'); 
});

app.get('/logout', function(request, response){
  request.session.destroy(function(err) {
    response.redirect('/');
  })
});

app.get('/admin', function (request, response) {
  if (request.session.user)
    response.render('pages/admin/index');
  else
    response.redirect('/');
});

app.get('/admin/*', function (request, response) {
  if (request.session.user){  
  let route = new Route(app.get('views') + '/pages' + request.path, request.query);
  route.getRoute('.ejs', data => {
    if (data)
      response.render('pages'+ request.path + request.query.data);
    else
      response.redirect('pages/error');
  });
  }else
    response.redirect('/');
});

app.get('/admin/getData/*', function (request, response) {
  if (request.session.user){
    let route = new Route(app.get('controller') + '/manage' + request.path, request.query);
    route.getRoute('.js', data => {
      if (data){
        let manage = new ControllerManage(request.params[0]);
        manage.getData(data => {
          response.write(JSON.stringify(data));
          response.end();
        });
      }else
        response.redirect('pages/error');
    });
  }else
    response.redirect('/');
});

app.get('/error', function (request, response){
  response.render('pages/error');
});

app.post('/login', function(request, response){
  let manageAdmin = new ManageAdmin();
  manageAdmin.loginValidation(request.body, valid => {
    if(valid){
      request.session.user = request.body.user;
      response.write(JSON.stringify(valid));
    }else
      response.write(JSON.stringify(valid));

      response.end();
  });
});

app.post('/import/*', (request, response) => {
  if (request.session.user){
    let controller = new ControllerImport(request.params[0], request.files.csv.data.toString('utf8').split('\r\n'));
    controller.csvInsertData(callback => {
      response.write(JSON.stringify(callback));
      response.end();
    });
  }else
    response.redirect('/');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

