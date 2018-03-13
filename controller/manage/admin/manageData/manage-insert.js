const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');
const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');

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
        }
    }
}

module.exports = ManageInsert;