const ManageReward = require('../../admin/manageReward/manage-reward');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');
const ManageDisciplineActivity = require('../../teacher/manageDisciplineActivity/manage-discipline-activity');
const ManageActivity = require('../../teacher/manageActivity/manage-activity');
const ManageQuestionActivity = require('../../teacher/manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../../teacher/manageAlternativeQuestion/manage-alternative-question');
const ManageStudentReward = require('../manageStudentReward/manage-student-reward');
const ManageStudent = require('../../admin/manageStudent/manage-student');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');

class ManageSearch {
    constructor(entity, parameters) {
        this.entity = entity;
        this.parameters = parameters;
    }
    getData(callback) {
        let that = this;

        switch (this.entity) {
            case 'studentInit':
                let data = {
                    "disciplines": "",
                    "rewards": {
                        "all": "",
                        "student": ""
                    }
                };

                let initStudentDiscipline = new ManageStudentDiscipline();
                let initStudentReward = new ManageStudentReward();
                let initRewards = new ManageReward();

                initStudentDiscipline.getDataStudentDiscipline(this.parameters, (disciplines) => {
                    data.disciplines = disciplines;

                    initRewards.getDataRewards(that.parameters, rewardsAll => {
                        data.rewards.all = JSON.parse(rewardsAll);

                        initStudentReward.selectRewards(that.parameters, (rewardsStudent) => {
                            data.rewards.student = rewardsStudent;
                            return callback(data);
                        });
                    });
                });
                break;
            case 'studentDiscipline':
                let manageStudentDiscipline = new ManageStudentDiscipline();
                manageStudentDiscipline.getDataStudentDiscipline(this.parameters, data => {
                    return callback(data);
                });
                break;
            case 'studentDisciplineActivity':
                let manageDisciplineActivity = new ManageDisciplineActivity();
                manageDisciplineActivity.getDataStudentDisciplineActivity(this.parameters, data => {
                    return callback(data);
                });
                break;
            case 'studentActivity':
                let manageActivity = new ManageActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let count = 0;
                let activity = {
                    id: parseInt(that.parameters.idActivity),
                    config: "",
                    questions: ""
                };

                manageActivity.getRealizeActivity(that.parameters, dataActivity => {
                    activity.config = dataActivity;

                    manageQuestionActivity.getQuestionObject(that.parameters.idActivity, dataQuestion => {
                        activity.questions = dataQuestion;

                        activity.questions.forEach((question, index) => {
                            manageAlternativeQuestion.getAlternativeQuestionRA(question.id, (alternative) => {
                                if (alternative.length == 0) {
                                    activity.questions[index].alternatives = null;
                                } else {
                                    activity.questions[index].alternatives = alternative;
                                }

                                if (count == activity.questions.length - 1) {
                                    return callback(activity);
                                }
                                count++;
                            });
                        });
                    });
                });
                break;
            case 'studentUser':
                let manageStudentSearchEdit = new ManageStudent();
                let dataEdit = {
                    user: ""
                }
                manageStudentSearchEdit.getDataStudentEdit(this.parameters, data => {
                    dataEdit.user = data;
                    return callback(dataEdit);
                });
                break;
            case 'studentCheck':
                let manageStudentCheck = new ManageStudent();
                manageStudentCheck.loginValidation(this.parameters, (valid) => {
                    return callback({ "valid": valid });
                });
                break;
            case 'newTopic':
                let manageTopicDiscipline = new ManageStudentDiscipline();
                let manageColaborationTopic = new ManageColaborationTopic();
                
                let dataTopics = {
                    "disciplines": "",
                    "typeTopics": ""
                };

                manageTopicDiscipline.getDataStudentDiscipline(this.parameters, (disciplines) => {
                    dataTopics.disciplines = disciplines;

                    manageColaborationTopic.getDataTypeTopic((typeTopics) =>{
                        dataTopics.typeTopics = JSON.parse(typeTopics);

                        return callback(dataTopics);
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