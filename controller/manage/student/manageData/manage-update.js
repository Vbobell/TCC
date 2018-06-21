const ManageStudent = require('../../admin/manageStudent/manage-student');
const ManageColaborationTopic = require('../manageColaborationTopic/manage-colaboration-topic');
const ManageTopicComment = require('../manageTopicComment/manage-topic-comment');

class ManageUpdate{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getUpdate(callback){
        switch(this.entity){
            case 'editStudentUser':
                let manageStudent = new ManageStudent();
                manageStudent.editStudantUser(this.parameters, (data) => {
                    return callback(data);
                });
            break;
            case 'topic':
            let manageColaborationTopic = new ManageColaborationTopic();

            manageColaborationTopic.updateTopicProperties(this.parameters, (data) => {
                return callback(data);
            });
            break;
            case 'topicComment':
            let manageTopicComment = new ManageTopicComment();

            manageTopicComment.updateStudentComment(this.parameters, (data) => {
                return callback(data);
            });
            break;
            case 'bestComment':
            let manageBestComment = new ManageTopicComment();

            manageBestComment.updateBestComment(this.parameters, (dataComment) => {
                manageBestComment.pointsComment(this.parameters, () =>{
                    return callback(dataComment);
                });
            });
            break;
            case 'updateResolvedTopic':
            let manageResolvedTopic = new ManageColaborationTopic();

            manageResolvedTopic.updateResolvedTopic(this.parameters, (data) => {
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