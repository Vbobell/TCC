const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageDisciplineActivity = require('../manageDisciplineActivity/manage-discipline-activity');

class ManageSearchTeacher{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getData(callback){
        switch(this.entity){
            case 'teacherDiscipline':
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.getDataTeacherDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'disciplineActivity':
                let manageDisciplineActivity = new ManageDisciplineActivity();
                manageDisciplineActivity.getDataDisciplineActivity(this.parameters, data =>{
                    return callback(data);
                });
            break;
            default:
                return callback(false);
            break;
        }
    }
}

module.exports = ManageSearchTeacher;