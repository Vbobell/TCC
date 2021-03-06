const ManageTeacherDiscipline = require('../manageTeacherDiscipline/manage-teacher-discipline');
const ManageDisciplineActivity = require('../manageDisciplineActivity/manage-discipline-activity');
const ManageRewardActivity = require('../manageRewardActivity/manage-reward-activity');
const ManageActivity = require('../manageActivity/manage-activity');
const ManageQuestionActivity = require('../manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../manageAlternativeQuestion/manage-alternative-question');
const ManageTeacher = require('../../admin/manageTeacher/manage-teacher');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');
const ManageDisciplineTopic = require('../manageDisciplineTopic/manage-discipline-topic');
const ManageTopicComment = require('../manageTopicComment/manage-topic-comment');

class ManageSearch {
    constructor(entity, parameters) {
        this.entity = entity;
        this.parameters = parameters;
    }
    getData(callback) {
        let that = this;
        
        switch (this.entity) {
            case 'teacherDiscipline':
                let data = {
                    "disciplines": ""
                };
                let manageTeacherDiscipline = new ManageTeacherDiscipline();
                manageTeacherDiscipline.getDataTeacherDiscipline(this.parameters, (disciplines) => {
                    data.disciplines = disciplines;
                    return callback(data);
                });
                break;
            case 'disciplineActivity':
                let manageDisciplineActivity = new ManageDisciplineActivity();
                manageDisciplineActivity.getDataDisciplineActivity(this.parameters, data => {
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
                manageActivityDiscipline.getDataTeacherDiscipline(this.parameters, dataDiscipline => {
                    returnData.disciplines = dataDiscipline;
                    manageRewardActivity.getDataRewardActivity(this.parameters, dataReward => {
                        returnData.rewards = dataReward;
                        return callback(returnData);
                    });
                });
                break;
            case 'editActivity':

                let manageEditActivityDiscipline = new ManageTeacherDiscipline();
                let manageEditRewardActivity = new ManageRewardActivity();
                let manageActivity = new ManageActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();

                let returnEditData = {
                    disciplines: "",
                    rewards: "",
                    activity: {
                        id: parseInt(that.parameters.idActivity),
                        config: "",
                        questions: "",
                        rewards: ""
                    }
                };

                manageEditActivityDiscipline.getDataTeacherDiscipline(that.parameters, dataDiscipline => {
                    returnEditData.disciplines = dataDiscipline;

                    manageEditRewardActivity.getDataRewardActivity(that.parameters, dataReward => {
                        returnEditData.rewards = dataReward;

                        manageActivity.getDataActivity(that.parameters, dataActivity => {
                            returnEditData.activity.config = dataActivity;

                            manageEditRewardActivity.getRewardInActivity(that.parameters, dataRewardActivity => {
                                returnEditData.activity.rewards = dataRewardActivity;

                                manageQuestionActivity.getQuestionObject(that.parameters.idActivity, dataQuestion => {
                                    returnEditData.activity.questions = dataQuestion;

                                    returnEditData.activity.questions.forEach((question, index) => {

                                        manageAlternativeQuestion.getAlternativeQuestion(question.id, (alternative, indexAlternative) => {
                                            if (alternative.length == 0) {
                                                returnEditData.activity.questions[index].alternatives = null;
                                            } else {
                                                returnEditData.activity.questions[index].alternatives = alternative;
                                            }

                                            if (index == returnEditData.activity.questions.length - 1) {
                                                return callback(returnEditData);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case 'teacherUser':
                let manageTeacherSearchEdit = new ManageTeacher();
                let dataEdit = {
                    user: ""
                }
                manageTeacherSearchEdit.getDataAdminEdit(this.parameters, data => {
                    dataEdit.user = data;
                    return callback(dataEdit);
                });
                break;
            case 'teacherCheck':
                let manageTeacherCheck = new ManageTeacher();
                manageTeacherCheck.loginValidation(this.parameters, (valid) => {
                    return callback({ "valid": valid });
                });
                break;
            case 'newTopic':
                let manageTopicDiscipline = new ManageTeacherDiscipline();
                let manageColaborationTopic = new ManageColaborationTopic();

                let dataTopics = {
                    "disciplines": "",
                    "typeTopics": ""
                };

                manageTopicDiscipline.getDataTeacherDiscipline(this.parameters, (disciplines) => {
                    dataTopics.disciplines = disciplines;

                    manageColaborationTopic.getDataTypeTopic((typeTopics) => {
                        dataTopics.typeTopics = JSON.parse(typeTopics);

                        return callback(dataTopics);
                    });
                });
                break;
            case 'disciplineTopic':
                let manageDisciplineTopic = new ManageDisciplineTopic();
                let dataDisciplineTopics = {
                    "alltopics": true,
                    "topics": ""
                };
                manageDisciplineTopic.getDisciplineTopic(this.parameters, (disciplineTopics) => {
                    dataDisciplineTopics.topics = disciplineTopics;
                    return callback(dataDisciplineTopics);
                });
                break;
            case 'myDisciplineTopic':
                let manageMyDisciplineTopic = new ManageDisciplineTopic();
                let dataMyDisciplineTopics = {
                    "alltopics": false,
                    "topics": ""
                };
                manageMyDisciplineTopic.getMyDisciplineTopic(this.parameters, (disciplineTopics) => {
                    dataMyDisciplineTopics.topics = disciplineTopics;
                    return callback(dataMyDisciplineTopics);
                });
                break;
            case 'editTopic':
                let manageEditColaborationTopic = new ManageColaborationTopic();
                let manageEditTopicDiscipline = new ManageTeacherDiscipline();

                let dataEditTopic = {
                    "disciplines": "",
                    "typeTopics": "",
                    "topic": ""
                };

                manageEditTopicDiscipline.getDataTeacherDiscipline(this.parameters, (disciplines) => {
                    dataEditTopic.disciplines = disciplines;

                    manageEditColaborationTopic.getDataTypeTopic((typeTopics) => {
                        dataEditTopic.typeTopics = JSON.parse(typeTopics);

                        manageEditColaborationTopic.getDataTopic(that.parameters, (topicData) => {
                            dataEditTopic.topic = topicData[0];
                            return callback(dataEditTopic);
                        });
                    });
                });

                break;
                case 'viewDisciplineAllTopics':
                let manageDisciplineAllTopics = new ManageDisciplineTopic();
                let manageTopicComment = new ManageTopicComment();

                let dataDisciplineAllTopics = {
                    "alltopics": true,
                    "topics": "",
                    "comments":""
                };

                manageDisciplineAllTopics.getDisciplineAllTopics(this.parameters, (dataTopics) => {
                    dataDisciplineAllTopics.topics = dataTopics;
                    
                    manageTopicComment.getComments(that.parameters, (dataComments) =>{
                        dataDisciplineAllTopics.comments = dataComments;
                        
                        return callback(dataDisciplineAllTopics);
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