const ManageActivity = require('../manageActivity/manage-activity');
const ManageRewardActivity = require('../manageRewardActivity/manage-reward-activity');
const ManageQuestionActivity = require('../manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../manageAlternativeQuestion/manage-alternative-question');
const ManageTeacher = require('../../admin/manageTeacher/manage-teacher');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');

class ManageUpdate {
    constructor(entity, parameters) {
        this.entity = entity;
        this.parameters = parameters;
    }
    getUpdate(callback) {
        switch (this.entity) {
            case 'activity':
                let manageActivity = new ManageActivity();
                let manageRewardActivity = new ManageRewardActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let that = this;

                manageActivity.updateDataActivity(that.parameters, (dataActivity) => {

                    manageQuestionActivity.getQuestionActivityIds(that.parameters.id, idsQuestions => {

                        manageAlternativeQuestion.removeDataAlternative(idsQuestions, dataRemoveQuestion => {

                            manageQuestionActivity.removeDataQuestions(that.parameters.id, () => {

                                manageRewardActivity.removeRewardActivity(that.parameters, () => {

                                    manageRewardActivity.insertDataReward(that.parameters, () => {
                                        that.parameters.questions.forEach((question, indexQuestion) => {

                                            manageQuestionActivity.insertDataQuestion(question, that.parameters.id,
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
                            });
                        });
                    });
                });
                break;
            case 'editTeacherUser':
                let manageTeacherEdit = new ManageTeacher();
                manageTeacherEdit.editTeacherUser(this.parameters, data => {
                    return callback(data);
                });
                break;
            case 'topic':
                let manageColaborationTopic = new ManageColaborationTopic();

                manageColaborationTopic.updateTopicProperties(this.parameters, (data) => {
                    return callback(data);
                });
                break;
            default:
                return callback("error");
                break;
        }
    }
}

module.exports = ManageUpdate;