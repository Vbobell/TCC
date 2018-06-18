const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');
const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');
const ManageStudentClass = require('../manageStudentClass/manage-student-class');
const ManageTeacherClass = require('../manageTeacherClass/manage-teacher-class');

class ManageInsert{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback){
        switch(this.entity){
            case 'courseDiscipline':
                let manageCourseDiscipline = new ManageCourseDiscipline();
                manageCourseDiscipline.insertDataCourseDiscipline(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'teacherDiscipline':
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.insertDataTeacherDiscipline(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'studentDiscipline':
                let manageStudentDiscipline = new ManageStudentDiscipline();
                manageStudentDiscipline.insertDataStudentDiscipline(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'studentClass':
                let manageStudentClass = new ManageStudentClass();
                manageStudentClass.insertDataStudentClass(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'teacherClass':
                let manageTeacherClass = new ManageTeacherClass();
                manageTeacherClass.insertDataTeacherClass(this.parameters, data => {
                    return callback(data);
                });
            break;
            default:
                return callback("error"); 
        }
    }
}

module.exports = ManageInsert;