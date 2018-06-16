const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');
const ManageTeacher = require('../manageTeacher/manage-teacher');
const ManageStudent = require('../manageStudent/manage-student');
const ManageClass = require('../manageClass/manage-class');

class ManageRemove{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getRemove(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.removeAdmin(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.removeCourse(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.removeDiscipline(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'teacher':
                let manageTeacher = new ManageTeacher();
                manageTeacher.removeTeacher(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'student':
                let manageStudent = new ManageStudent();
                manageStudent.removeStudent(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'class':
                let manageClass = new ManageClass();
                manageClass.removeClass(this.parameters, data => {
                    return callback(data);
                });
            break;
            default:
                return callback("error"); 
        }
    }
}

module.exports = ManageRemove;