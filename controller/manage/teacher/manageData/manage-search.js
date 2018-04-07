const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageDisciplineActivity = require('../manageDisciplineActivity/manage-discipline-activity');
const ManageRewardActivity = require('../manageRewardActivity/manage-reward-activity');

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
            case 'newActivity':
                let manageActivityDiscipline = new ManageTeacherDiscipline();
                let manageRewardActivity = new ManageRewardActivity();
                let returnData = {
                    disciplines: "",
                    rewards: ""
                };
                manageActivityDiscipline.getDataTeacherDiscipline(this.parameters, dataDiscipline =>{
                    returnData.disciplines = dataDiscipline;
                    manageRewardActivity.getDataRewardActivity(this.parameters, dataReward =>{
                        returnData.rewards = dataReward;                       
                        return callback(returnData);
                    });
                });
            break;
            default:
                return callback(false);
            break;
        }
    }
}

module.exports = ManageSearchTeacher;