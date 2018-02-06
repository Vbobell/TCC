const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');
const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');

class ManageInsert{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getInsert(callback){
        switch(this.entity){
            case 'courseDiscipline':
                let manageCourseDiscipline = new ManageCourseDiscipline();
                manageCourseDiscipline.insertDataCourseDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'teacherDiscipline':
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.insertDataTeacherDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'studentDiscipline':
                let manageStudentDiscipline = new ManageStudentDiscipline();
                manageStudentDiscipline.insertDataStudentDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageInsert;