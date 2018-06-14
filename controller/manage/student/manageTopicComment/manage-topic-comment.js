const CrudTopicComment = require('../../../../models/crud/crudTopicComment/crud-topic-comment');

class ManageTopicComment {
    constructor() {
        this.crudTopicComment = new CrudTopicComment();
    }

    getComments(parameters, callback) {
        let registry = [
            parameters.idDiscipline
        ];
        let comments = [];

        this.crudTopicComment.selectTeacherTopicComments(registry, (teacherComments) => {
            comments = comments.concat(teacherComments);

            this.crudTopicComment.selectStudentTopicComments(registry, (studentComments) => {
                comments = comments.concat(studentComments);
                return callback(comments);
            });
        });
    }

    insertStudentComment(parameters, callback) {
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

    updateStudentComment(parameters, callback) {
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
            (commentData) => {
                return callback(commentData);
            });
    }

    updateBestComment(parameters, callback) {
        let registryAll = [
            parameters.idTopic,
            false
        ];

        let whereAll = "id_topic = $1";

        if (parameters.bestComment) {
            this.crudTopicComment.executeUpdate(
                'teacher_topic_comments',
                '(best_comment)',
                '($2)',
                whereAll,
                registryAll,
                (allComment) => {

                    this.crudTopicComment.executeUpdate(
                        'student_topic_comments',
                        '(best_comment)',
                        '($2)',
                        whereAll,
                        registryAll,
                        (allComment) => {

                            let table = "";
                            let registry = "";
                            let where = "";

                            if (parameters.commentTypeUser == "student") {
                                table = "student_topic_comments";
                                where = "id_topic = $1 AND id_student = $2 AND id_student_topic_comment = $3";
                            } else {
                                table = "teacher_topic_comments";
                                where = "id_topic = $1 AND id_teacher = $2 AND id_teacher_topic_comment = $3";
                            }

                            registry = [
                                parameters.idTopic,
                                parameters.idUser,
                                parameters.idComment,
                                parameters.bestComment
                            ];

                            this.crudTopicComment.executeUpdate(
                                table,
                                '(best_comment)',
                                '($4)',
                                where,
                                registry,
                                (commentData) => {
                                    return callback(commentData);
                                });
                        });
                });
        } else {
            let table = "";
            let registry = "";
            let where = "";

            if (parameters.commentTypeUser == "student") {
                table = "student_topic_comments";
                where = "id_topic = $1 AND id_student = $2 AND id_student_topic_comment = $3";
            } else {
                table = "teacher_topic_comments";
                where = "id_topic = $1 AND id_teacher = $2 AND id_teacher_topic_comment = $3";
            }

            registry = [
                parameters.idTopic,
                parameters.idUser,
                parameters.idComment,
                parameters.bestComment
            ];

            this.crudTopicComment.executeUpdate(
                table,
                '(best_comment)',
                '($4)',
                where,
                registry,
                (commentData) => {
                    return callback(commentData);
                });
        }
    }
}

module.exports = ManageTopicComment;

