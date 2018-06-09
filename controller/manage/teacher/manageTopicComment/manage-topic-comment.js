const CrudTopicComment = require('../../../../models/crud/crudTopicComment/crud-topic-comment');

class ManageTopicComment{
    constructor(){
        this.crudTopicComment = new CrudTopicComment();
    }

    getComments(parameters, callback){
        let registry = [
            parameters.idDiscipline
        ];
        let comments = [];

        this.crudTopicComment.selectTeacherTopicComments(registry, (teacherComments) =>{
            comments = comments.concat(teacherComments);

            this.crudTopicComment.selectStudentTopicComments(registry, (studentComments) => {
                comments = comments.concat(studentComments);
                return callback(comments);
            });
        });
    }

    insertTeacherComment(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idTeacher,
            parameters.comment
        ];

        this.crudTopicComment.executeUniqueInsert(
            'teacher_topic_comments', 
            '(id_topic, id_teacher, comment)',
            '($1, $2, $3)',
            'id_teacher_topic_comment',
            registry,
            (topicData) => {
                return callback(topicData);
            });
    }
}

module.exports = ManageTopicComment;

