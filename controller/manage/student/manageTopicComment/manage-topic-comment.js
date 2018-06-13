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

    insertStudentComment(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idStudent,
            parameters.comment
        ];

        this.crudTopicComment.executeUniqueInsert(
            'student_topic_comments', 
            '(id_topic, id_student, comment)',
            '($1, $2, $3)',
            'id_student_topic_comment',
            registry,
            (topicData) => {
                return callback(topicData);
            });
    }

    updateStudentComment(parameters, callback){
        let registry = [
            parameters.idComment,
            parameters.idStudent,
            parameters.comment
        ];

        let where = "id_student_topic_comment = $1 AND id_student = $2";

        this.crudTopicComment.executeUpdate(
            'student_topic_comments', 
            '(comment)',
            '($3)',
            where,
            registry,
            (topicData) => {
                return callback(topicData);
            });
    }
}

module.exports = ManageTopicComment;

