const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');
const ManageTeacher = require('../manageTeacher/manage-teacher');
const ManageStudent = require('../manageStudent/manage-student');
const ManageReward = require('../manageReward/manage-reward');
const ManageRewardConfig = require('../manageRewardConfig/manage-reward-config');

class ManageEdit{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getEdit(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.editAdmin(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.editCourse(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.editDiscipline(this.parameters, data => {
                    return callback(data);
                });
            break;  
            case 'teacher':
                let manageTeacher = new ManageTeacher();
                manageTeacher.editTeacher(this.parameters, data => {
                    return callback(data);
                });
            break;   
            case 'student':
                let manageStudent = new ManageStudent();
                manageStudent.editStudent(this.parameters, data => {
                    return callback(data);
            });
            break;  
            case 'reward':
                let manageReward = new ManageReward();
                manageReward.enableDisableReward(this.parameters, data => {
                    return callback(data);
                });
            break;
            case 'rewardConfig':
                let manageRewardConfig = new ManageRewardConfig();
                manageRewardConfig.editRewardConfig(this.parameters, data => {
                    return callback(data);
                });
            break;
            default:
                return callback("error");            
        }
    }
}

module.exports = ManageEdit;