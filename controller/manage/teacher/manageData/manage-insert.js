const ManageActivity = require('../manageActivity/manage-activity');
const ManageRewardActivity = require('../manageRewardActivity/manage-reward-activity');
const ManageQuestionActivity = require('../manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../manageAlternativeQuestion/manage-alternative-question');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');
const ManageTopicComment = require('../manageTopicComment/manage-topic-comment');

class ManageInsert {
    constructor(entity, parameters) {
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback) {
        switch (this.entity) {
            case 'activity':
                let manageActivity = new ManageActivity();
                let manageRewardActivity = new ManageRewardActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let that = this;

                manageActivity.insertDataActivity(that.parameters, (dataActivity) => {
                    that.parameters.id = dataActivity[0].id_activity;

                    manageRewardActivity.insertDataReward(that.parameters, () => {
                        that.parameters.questions.forEach((question, indexQuestion) => {
                            manageQuestionActivity.insertDataQuestion(question, dataActivity[0].id_activity,
                                dataQuestion => {
                                    that.parameters.questions[indexQuestion].id = dataQuestion[0].id_question;

                                    if (question.alternatives != null) {
                                        question.alternatives.forEach((alternative, indexAlternative) => {
                                            manageAlternativeQuestion.insertDataAlternative(
                                                alternative, dataQuestion[0].id_question,
                                                dataAlternative => {
                                                    that.parameters.questions[indexQuestion].alternatives[indexAlternative].id =
                                                        dataAlternative[0].id_alternative;
                                                    if (indexQuestion == that.parameters.questions.length - 1 &&
                                                        indexAlternative == that.parameters.questions[indexQuestion].alternatives.length - 1) {
                                                        return callback(that.parameters);
                                                    }
                                                });
                                        });
                                    } else {
                                        if (indexQuestion == that.parameters.questions.length - 1) {
                                            return callback(that.parameters);
                                        }
                                    }
                                });
                        });
                    });
                });
                break;
            case 'topic':
                let manageColaborationTopic = new ManageColaborationTopic();

                manageColaborationTopic.insertTopicProperties(this.parameters, (idsTopic) => {
                    return callback(idsTopic);
                });
                break;
            case 'topicComment':
            let manageTopicComment = new ManageTopicComment();

            manageTopicComment.insertTeacherComment(this.parameters, (idComment) =>{
                return callback(idComment);
            });
            break;
            default:
                return callback(false);
                break;
        }
    }
}

module.exports = ManageInsert;