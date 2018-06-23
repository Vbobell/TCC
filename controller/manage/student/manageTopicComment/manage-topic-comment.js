const CrudTopicComment = require('../../../../models/crud/crudTopicComment/crud-topic-comment');
const CrudUserPoints = require('../../../../models/crud/crudUserPoints/crud-user-points');

class ManageTopicComment {
    constructor() {
        this.crudTopicComment = new CrudTopicComment();
        this.crudUserPoints = new CrudUserPoints();
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
           /*  this.crudTopicComment.executeUpdate(
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
                        (allComment) => { */
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
            /*             });
                }); */
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

    pointsComment(parameters, callback) {
        let that = this;

        let registry = [
            parameters.idUser,
            parameters.idDiscipline
        ];
        let table = "";
        let columns = "";
        let columnUser = "";
        let returnId = "";
        let where = "";

        if (parameters.commentTypeUser == "student") {
            table = 'student_points';
            columns = '(id_student, id_discipline, points)';
            columnUser = 'id_student';
            returnId = 'id_student_point';
            where = "id_student = $1 AND id_discipline = $2";
        } else {
            table = 'teacher_points';
            columns = '(id_teacher, id_discipline, points)';
            columnUser = 'id_teacher';
            returnId = 'id_teacher_point';
            where = "id_teacher = $1 AND id_discipline = $2";
        }

        let parametersUser = {
            table,
            columnUser
        };

        this.crudUserPoints.selectUserPoint(parametersUser, registry, (data) => {
            if (data.length == 0 && parameters.bestComment) {
                registry.push(parameters.points);
                that.crudUserPoints.executeUniqueInsert(
                    table, columns, '($1, $2, $3)', returnId, registry,
                    (topicData) => {
                        return callback(topicData);
                    });
            } else if (data.length > 0) {
                if (parameters.bestComment) {
                    registry.push(parseFloat(data[0].points) + parseFloat(parameters.points));
                } else {
                    let result = parseFloat(data[0].points) - parseFloat(parameters.points);

                    if (result < 0) {
                        registry.push(0);
                    } else {
                        registry.push(result);
                    }
                }

                this.crudUserPoints.executeUpdate(
                    table, '(points)', '($3)', where, registry,
                    (user) => {
                        return callback(user);
                    });
            } else {
                return callback(false);
            }
        });

    }
}

module.exports = ManageTopicComment;

