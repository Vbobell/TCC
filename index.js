const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const Route = require('./controller/viewRoutes/routes');
const ManageLogin = require('./controller/manage/login/manage-login');
//Admin manage
const ControllerImport = require('./controller/importFile/controller-import');
const ManageSearch = require('./controller/manage/admin/manageData/manage-search');
const ManageEdit = require('./controller/manage/admin/manageData/manage-edit');
const ManageRemove = require('./controller/manage/admin/manageData/manage-remove');
const ManageInsert = require('./controller/manage/admin/manageData/manage-insert');
const RouteAdmin = require('./controller/viewRoutes/admin/route-admin');
//Teacher manage
const RouteTeacher = require('./controller/viewRoutes/teacher/routes');
//Student manage
const RouteStudent = require('./controller/viewRoutes/student/routes');

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


/* Login functions */

app.get('/logout', function(request, response){
  request.session.destroy(function(err) {
    response.redirect('/');
  })
});

app.get('/', function(request, response){ 
  if (request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.render('pages/login'); 
  }
});
 
app.get('/admin', function (request, response) {
  if (request.session.user && request.session.user.type == 'admin'){
    response.render('pages/admin/index', { way : 'registros', user : request.session.user});
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.get('/teacher', function (request, response) {
  if (request.session.user && request.session.user.type == 'teacher'){
    controller = {
      type: 'search',
      entity: 'teacherDiscipline',
      parameters: {
        'registry': request.session.user.user,
        'limit' : 9,
        'offset' : 0
      }
    };

    let routeTeacher = new RouteTeacher(controller);
    routeTeacher.getRouteData((data) =>{
      if(data){
        response.render('pages/teacher/index', {data : data , user : request.session.user, way : 'atividades'});
      }else{
        response.redirect('/error');
      }
    });
  }else if(request.session.user){
      response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.get('/student', function (request, response) {
  if (request.session.user && request.session.user.type == 'student'){
    controller = {
      type: 'search',
      entity: 'studentInit',
      parameters: {
        'registry': request.session.user.user,
        'limit' : 9,
        'offset' : 0
      }
    };

    let routeStudent = new RouteStudent(controller);
    routeStudent.getRouteData((data) =>{
      if(data){
        response.render('pages/student/index', {data : data , user : request.session.user, way : 'atividades'});
      }else{
        response.redirect('/error');
      }
    });
  }else if(request.session.user){
      response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.post('/login', function(request, response){
  let manageLogin = new ManageLogin(request.body);
  manageLogin.login(valid => {
    if(valid){
      request.session.user = valid;
    }  
    response.write(JSON.stringify(valid));
    response.end();
  });
});

/* Login functions */

/*admin functions*/
app.get('/admin/route/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'admin'){  
  let route = new Route(app.get('views') + '/pages/admin/' + request.query.path + '/', request.query.file, '.ejs');
  route.getRoute(data => {
    if (data)
      response.render('pages/admin/' + request.query.path + '/' + request.query.file, {user : request.session.user});
    else
      response.redirect('/error');
  });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
  response.redirect('/');
  }
});

app.get('/admin/getData', function (request, response) {
  if (request.session.user && request.session.user.type == 'admin'){
    let manageSearch = new ManageSearch(request.query.entity, request.query);
    manageSearch.getData(data =>{
      response.write(data);
      response.end();
    });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.post('/import/*', (request, response) => {
  if (request.session.user && request.session.user.type == 'admin'){
    let controller = new ControllerImport(request.params[0], request.files.csv.data.toString('utf8').split('\r\n'));
    controller.csvInsertData(callback => {
      response.write(JSON.stringify(callback));
      response.end();
    });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.post('/admin/remove', (request, response) => {
  if (request.session.user && request.session.user.type == 'admin'){
    let manageRemove = new ManageRemove(request.body.entity, request.body);
    manageRemove.getRemove( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.post('/admin/edit', (request, response) => {
  if (request.session.user && request.session.user.type == 'admin'){
    let manageEdit = new ManageEdit(request.body.entity, request.body);
    manageEdit.getEdit( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.post('/admin/insert', (request, response) => {
  if (request.session.user && request.session.user.type == 'admin'){
    let manageInsert = new ManageInsert(request.body.entity, request.body);
    manageInsert.getInsert( data =>{
      response.write(JSON.stringify(data));
      response.end();
    });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
    response.redirect('/');
  }
});

app.get('/admin/newRoute/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'admin'){  
  let route = new Route(app.get('views') + '/pages/admin/' + request.query.path + '/', request.query.file, '.ejs');
  
  route.getRoute(routeData => {
    if (routeData){
      let routeAdmin = new RouteAdmin(request.query.controller);
      
      routeAdmin.getRouteData((data) => {
        if(data){
          response.render('pages/admin/' + request.query.path + '/' + request.query.file, { data : data , user : request.session.user});
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
  });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
  response.redirect('/');
  }
});

app.get('/admin/dataRoute/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'admin'){  
      let routeAdmin = new RouteAdmin(request.query.controller);
      
      routeAdmin.getRouteData((data) => {
        if(data){
          response.write(JSON.stringify(data));
          response.end();
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
});

app.post('/admin/post/*', (request, response) => {
  if (request.session.user && request.session.user.type == 'admin'){
        let routeAdmin = new RouteAdmin(request.body.controller);
        
        routeAdmin.getRouteData((data) => {
          if(data){
            if(request.body.controller.entity == "editAdminUser"){
              request.session.user.name = request.body.controller.parameters.nameUser;
              request.session.user.identity = request.body.controller.parameters.avatar;
            }
            response.write(JSON.stringify(data));
            response.end();
          }else{
            response.redirect('/error');
          }
        })
      }else{
        response.redirect('/error');
      }
});
/*admin functions*/

/*teacher functions*/
app.get('/teacher/route/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'teacher'){  
  let route = new Route(app.get('views') + '/pages/teacher/' + request.query.path + '/', request.query.file, '.ejs');
  
  route.getRoute(routeData => {
    if (routeData){
      let routeTeacher = new RouteTeacher(request.query.controller);
      
      routeTeacher.getRouteData((data) => {
        if(data){
          response.render('pages/teacher/' + request.query.path + '/' + request.query.file, { data : data , user : request.session.user});
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
  });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
  response.redirect('/');
  }
});

app.get('/teacher/dataRoute/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'teacher'){  
      let routeTeacher = new RouteTeacher(request.query.controller);
      
      routeTeacher.getRouteData((data) => {
        if(data){
          response.write(JSON.stringify(data));
          response.end();
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
});

app.post('/teacher/post/*', (request, response) => {
  if (request.session.user && request.session.user.type == 'teacher'){
        let routeTeacher = new RouteTeacher(request.body.controller);
        
        routeTeacher.getRouteData((data) => {
          if(data){
            if(request.body.controller.entity == "editTeacherUser"){
              request.session.user.name = request.body.controller.parameters.nameUser;
              request.session.user.identity = request.body.controller.parameters.avatar;
            }
            response.write(JSON.stringify(data));
            response.end();
          }else{
            response.redirect('/error');
          }
        })
      }else{
        response.redirect('/error');
      }
});
/*teacher functions*/

/*student functions*/
app.get('/student/route/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'student'){  
  let route = new Route(app.get('views') + '/pages/student/' + request.query.path + '/', request.query.file, '.ejs');
  
  route.getRoute(routeData => {
    if (routeData){
      let routeStudent = new RouteStudent(request.query.controller);
      
      routeStudent.getRouteData((data) => {
        if(data){
          response.render('pages/student/' + request.query.path + '/' + request.query.file, { data : data , user : request.session.user});
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
  });
  }else if(request.session.user){
    response.redirect(request.session.user.route);
  }else{
  response.redirect('/');
  }
});

app.get('/student/dataRoute/*', function (request, response) {
  if (request.session.user && request.session.user.type == 'student'){  
      let routeStudent = new RouteStudent(request.query.controller);
      
      routeStudent.getRouteData((data) => {
        if(data){
          response.write(JSON.stringify(data));
          response.end();
        }else{
          response.redirect('/error');
        }
      })
    }
    else{
      response.redirect('/error');
    }
});

app.post('/student/post/*', (request, response) => {
  if (request.session.user && request.session.user.type == 'student'){
        let routeStudent = new RouteStudent(request.body.controller);
        
        routeStudent.getRouteData((data) => {
          if(data){
            if(request.body.controller.entity == "editStudentUser"){
              request.session.user.name = request.body.controller.parameters.nameUser;
              request.session.user.identity = request.body.controller.parameters.avatar;
            }
            response.write(JSON.stringify(data));
            response.end();
          }else{
            response.redirect('/error');
          }
        })
      }else{
        response.redirect('/error');
      }
});
/*student functions*/
app.get('/error', function (request, response){
  response.render('pages/error');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

