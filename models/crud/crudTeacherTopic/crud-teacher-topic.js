const Crud = require('../generic-crud');

class CrudTeacherTopic extends Crud{
    selectDisciplineTopics(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
               client.query(`SELECT 
               topic.id_topic, topic.name_topic, 
               type_topic.name_type_topic, type_topic.file_type_topic 
               FROM 
               topic, type_topic, colaboration_topic 
               WHERE 
               topic.id_topic = colaboration_topic.id_topic 
               AND 
               type_topic.id_type_topic = colaboration_topic.id_colaboration_topic 
               AND 
               colaboration_topic.id_discipline = $1 
               GROUP BY 
               (topic.id_topic, type_topic.name_type_topic, type_topic.file_type_topic) 
               ORDER BY topic.id_topic ASC`, registry, function (err, result) {
                done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectMyDisciplineTopics(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
               client.query(`SELECT 
               topic.id_topic, topic.name_topic, 
               type_topic.name_type_topic, type_topic.file_type_topic 
               FROM 
               topic, type_topic, colaboration_topic, teacher_topic
               WHERE 
               topic.id_topic = colaboration_topic.id_topic 
               AND 
               type_topic.id_type_topic = colaboration_topic.id_type_topic 
               AND
               teacher_topic.id_colaboration_topic = colaboration_topic.id_colaboration_topic
               AND 
               colaboration_topic.id_discipline = $1
               AND
               teacher_topic.id_teacher = $2
               GROUP BY 
               (topic.id_topic, type_topic.name_type_topic, type_topic.file_type_topic) 
               ORDER BY topic.id_topic ASC`, registry, function (err, result) {
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

module.exports = CrudTeacherTopic;