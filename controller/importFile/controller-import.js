const AdminImportController = require('./admin/import-admin');
const CourseImportController = require('./course/import-course');
const DisciplineImportController = require('./discipline/import-discipline');
const TeacherImportController = require('./teacher/import-teacher');
const StudentImportController = require('./student/student-import');

class ControllerImport{
    constructor(route, data){
        this.route = route;
        this.data = data;
    }
    csvInsertData(callback){
        switch(this.route){
            case 'admin':
                let controllerAdm = new AdminImportController(this.data);
                controllerAdm.getReadData( data => 
                    controllerAdm.insertDataAdmin(data, response => callback(response))
                );
            break;
            case 'course':
                let controllerCourse = new CourseImportController(this.data);
                controllerCourse.getReadData( data =>
                    controllerCourse.insertDataCourse(data, response => callback(response))
                );
            break;
            case 'discipline':
                let controllerDiscipline = new DisciplineImportController(this.data);
                controllerDiscipline.getReadData( data =>
                    controllerDiscipline.insertDataDiscipline(data, response => callback(response))
                );
            break;
            case 'teacher':
                let controllerTeacher = new TeacherImportController(this.data);
                controllerTeacher.getReadData( data =>
                    controllerTeacher.insertDataTeacher(data, response => callback(response))
                );
            break;
            case 'student':
                let controllerStudent = new StudentImportController(this.data);
                controllerStudent.getReadData( data =>
                    controllerStudent.insertDataStudent(data, response => callback(response))
                );
            break;
            default:
                callback('error');
            break;
        }
    }
}

module.exports = ControllerImport;