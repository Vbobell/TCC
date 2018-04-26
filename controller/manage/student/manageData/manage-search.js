const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');
const ManageDisciplineActivity = require('../../teacher/manageDisciplineActivity/manage-discipline-activity');
const ManageActivity = require('../../teacher/manageActivity/manage-activity');
const ManageQuestionActivity = require('../../teacher/manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../../teacher/manageAlternativeQuestion/manage-alternative-question');

class ManageSearch{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getData(callback){
        switch(this.entity){
            case 'studentDiscipline':
                let manageStudentDiscipline = new ManageStudentDiscipline();
                manageStudentDiscipline.getDataStudentDiscipline(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'studentDisciplineActivity':
                let manageDisciplineActivity = new ManageDisciplineActivity();
                manageDisciplineActivity.getDataStudentDisciplineActivity(this.parameters, data =>{
                    return callback(data);
                });
            break;
            case 'studentActivity':
                let that = this;
                let manageActivity = new ManageActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let count = 0;
                let activity = {
                    id: parseInt(that.parameters.idActivity),
                    config: "",
                    questions: ""
                };

                manageActivity.getRealizeActivity(that.parameters, dataActivity =>{
                    activity.config = dataActivity;

                    manageQuestionActivity.getQuestionObject(that.parameters.idActivity, dataQuestion =>{
                        activity.questions = dataQuestion;

                        activity.questions.forEach((question, index) => {
                            manageAlternativeQuestion.getAlternativeQuestionRA(question.id, (alternative) =>{
                                if(alternative.length == 0){
                                    activity.questions[index].alternatives = null;
                                }else{
                                    activity.questions[index].alternatives = alternative;
                                }

                                if(count == activity.questions.length-1){
                                    return callback(activity);
                                }
                                count++;
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

module.exports = ManageSearch;