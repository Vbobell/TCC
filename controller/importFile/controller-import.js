const AdminImportController = require('./admin/import-admin');
const CourseImportController = require('./course/import-course');

class ControllerImport{
    constructor(route, data){
        this.route = route;
        this.data = data;
    }
    csvInsertData(callback){
        switch(this.route){
            case 'admin':
                let controllerAdm = new AdminImportController(this.data);
                controllerAdm.getReadData(data => 
                    controllerAdm.insertDataAdmin(data, response => callback(response))
                );
            break;
            case 'course':
                let controllerCourse = new CourseImportController(this.data);
                controllerCourse.getReadData( data =>
                    controllerCourse.insertDataAdmin(data, response => callback(response))
                );
            default:
                callback('error');
            break;
        }
    }
}

module.exports = ControllerImport;