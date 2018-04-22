const ManageActivity = require('../manageActivity/manage-activity');
const ManageRewardActivity = require('../manageRewardActivity/manage-reward-activity');
const ManageQuestionActivity = require('../manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../manageAlternativeQuestion/ManageAlternativeQuestion');

class ManageDelete{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getDelete(callback){
        switch(this.entity){
            case 'activity':
                let manageActivity = new ManageActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let manageRewardActivity = new ManageRewardActivity();
                let that = this;

                manageQuestionActivity.getQuestionActivityIds(that.parameters.idActivity, idsQuestions => {

                    manageAlternativeQuestion.removeDataAlternative(idsQuestions, dataRemoveQuestion =>{
                                
                        manageQuestionActivity.removeDataQuestions(that.parameters.idActivity, () =>{

                            manageRewardActivity.removeRewardActivity(that.parameters, () => {
                                
                                manageActivity.removeDataActivity(that.parameters, (data) => {
                                    return callback(data);
                                });
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

module.exports = ManageDelete;