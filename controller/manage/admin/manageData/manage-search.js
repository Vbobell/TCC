const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');
const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');
const ManageTeacher = require('../manageTeacher/manage-teacher');
const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');

class ManageSearch{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.getDataCourses(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.getDataDiscipline(this.parametres, data =>{
                    return callback(data);
                });
            break;
            case 'courseDiscipline':
                let manageCourseDiscipline = new ManageCourseDiscipline();
                manageCourseDiscipline.getDataCourseDiscipline(this.parametres, data =>{
                    return callback(data);
                });
            break;
            case 'teacher':
                let manageTeacher = new ManageTeacher();
                manageTeacher.getDataTeachers(this.parametres, data =>{
                    return callback(data);
                });
            break;
            case 'teacherDiscipline':
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.getDataTeacherDiscipline(this.parametres, data =>{
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;