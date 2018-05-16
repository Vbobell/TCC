const ManageStudentActivity = require('../manageStudentActivity/manage-student-activity');
const ManageStudentReward = require('../manageStudentReward/manage-student-reward');

class ManageInsert{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback){
        switch(this.entity){
            case 'studentActivity':
                let manageStudentActivity = new ManageStudentActivity();
                let manageStudentReward = new ManageStudentReward();
                let that = this;

                manageStudentActivity.checkQuestions(that.parameters.activity, (corrects) => {
                    manageStudentActivity.insertDataActivity(corrects, that.parameters, (correct) => {
                        that.parameters.activity.correct = correct;
                        manageStudentActivity.insertQuestions(that.parameters, (result) => {
                            manageStudentReward.getRewardsNotConfig(that.parameters, (rewards) => {
                                return callback(rewards);
                            });
                        });
                    });
                });
            break;
            default:
            return callback(false);
            break;
        }
    }
}

module.exports = ManageInsert;