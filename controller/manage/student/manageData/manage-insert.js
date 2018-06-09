const ManageStudentActivity = require('../manageStudentActivity/manage-student-activity');
const ManageStudentReward = require('../manageStudentReward/manage-student-reward');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');
const ManageTopicComment = require('../manageTopicComment/manage-topic-comment');

class ManageInsert {
    constructor(entity, parameters) {
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback) {
        switch (this.entity) {
            case 'studentActivity':
                let manageStudentActivity = new ManageStudentActivity();
                let manageStudentReward = new ManageStudentReward();
                let that = this;

                manageStudentActivity.checkQuestions(that.parameters.activity, (corrects) => {
                    manageStudentActivity.insertDataActivity(corrects, that.parameters, (activityData) => {
                        that.parameters.activity.correct = activityData.correct;
                        that.parameters.activity.points = {
                            "pointsReached": activityData.pointsReached,
                            "points": activityData.points
                        }
                        manageStudentActivity.insertQuestions(that.parameters, (result) => {
                            manageStudentReward.getRewardsNotConfig(that.parameters, (rewardsNotConfig) => {
                                manageStudentReward.getRewardsConfig(that.parameters, rewardsNotConfig, (rewards) => {
                                    return callback(rewards);
                                });
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

                manageTopicComment.insertStudentComment(this.parameters, (idComment) =>{
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