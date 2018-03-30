const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');

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
            default:
                return callback(false);
        }
    }
}

module.exports = ManageSearchTeacher;