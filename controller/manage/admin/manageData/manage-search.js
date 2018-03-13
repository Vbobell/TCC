const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');
const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');
const ManageTeacher = require('../manageTeacher/manage-teacher');
const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageStudent = require('../manageStudent/manage-student');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');
const ManageReward = require('../manageReward/manage-reward');

class ManageSearch{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.getDataCourses(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.getDataDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'courseDiscipline':
                let manageCourseDiscipline = new ManageCourseDiscipline();
                manageCourseDiscipline.getDataCourseDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'teacher':
                let manageTeacher = new ManageTeacher();
                manageTeacher.getDataTeachers(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'teacherDiscipline':
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.getDataTeacherDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'student':
                let manageStudent = new ManageStudent();
                manageStudent.getDataStudents(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'studentDiscipline':
                let manageStudentDiscipline = new ManageStudentDiscipline();
                manageStudentDiscipline.getDataStudentDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'reward':
                let manageReward = new ManageReward();
                manageReward.getDataRewards(this.parameters, data =>{
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;