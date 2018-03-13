const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ControllerImport = require('./controller/importFile/controller-import');
const Route = require('./controller/viewRoutes/routes');
const ManageAdmin = require('./controller/manage/admin/manageAdmin/manage-admin');
const ManageSearch = require('./controller/manage/admin/manageData/manage-search');
const ManageEdit = require('./controller/manage/admin/manageData/manage-edit');
const ManageRemove = require('./controller/manage/admin/manageData/manage-remove');
const ManageInsert = require('./controller/manage/admin/manageData/manage-insert');

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
  cookie: { maxAge: (60000 * 60) * 24 }
}));

app.get('/logout', function(request, response){
  request.session.destroy(function(err) {
    response.redirect('/');
  })
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

app.get('/admin/route/*', function (request, response) {
  if (request.session.user){  
  let route = new Route(app.get('views') + '/pages/admin/' + request.query.path + '/', request.query.file, '.ejs');
  route.getRoute(data => {
    if (data)
      response.render('pages/admin/' + request.query.path + '/' + request.query.file);
    else
      response.redirect('/error');
  });
  }else
    response.redirect('/');
});

app.get('/admin/getData', function (request, response) {
  if (request.session.user){
    let manageSearch = new ManageSearch(request.query.entity, request.query);
    manageSearch.getData(data =>{
      response.write(data);
      response.end();
    });
    //Local test
    /*mvar data = [{'name_admin':'test','registre':1},{'name_admin':'test','registre':1}];
    response.write(JSON.stringify(data));
    response.end();*/
  }else
    response.redirect('/');
});

app.get('/error', function (request, response){
  response.render('pages/error');
});

app.post('/login', function(request, response){
  request.session.user = request.body.user;
  let manageAdmin = new ManageAdmin();
  manageAdmin.loginValidation(request.body, valid => {
    if(valid){
      request.session.user = request.body.user;
    }
      response.write(JSON.stringify(valid));
      response.end();   
  });
  //Local test
  /*request.session.user = request.body.user;
  response.write(JSON.stringify(true));
  response.end();*/
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

app.post('/admin/remove', (request, response) => {
  if (request.session.user){
    let manageRemove = new ManageRemove(request.body.entity, request.body);
    manageRemove.getRemove( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else
    response.redirect('/');
});

app.post('/admin/edit', (request, response) => {
  if (request.session.user){
    let manageEdit = new ManageEdit(request.body.entity, request.body);
    manageEdit.getEdit( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else
    response.redirect('/');
});

app.post('/admin/insert', (request, response) => {
  if (request.session.user){
    let manageInsert = new ManageInsert(request.body.entity, request.body.registers);
    manageInsert.getInsert( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else
    response.redirect('/');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

