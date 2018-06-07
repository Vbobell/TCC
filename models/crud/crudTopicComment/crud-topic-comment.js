const Crud = require('../generic-crud');

class CrudTopicComment extends Crud{
    selectTopicComments(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
               client.query(`SELECT 
               student_topic_comments.id_student_topic_comment, student_topic_comments.id_topic,
               student_topic_comments.id_student, student_topic_comments.comment, 
               student_topic_comments.best_comment, student_topic_comments.points,
               student.name_student, student.user_identity
               FROM student_topic_comments, student, colaboration_topic
               WHERE
               student_topic_comments.id_topic = colaboration_topic.id_topic
               AND
               student.id_student = student_topic_comments.id_student
               AND
               colaboration_topic.id_discipline = $1`, registry, function (err, result) {
                done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
}

module.exports = CrudTopicComment;