const Crud = require('../generic-crud');

class CrudTopic extends Crud{
    selectTopicEdit(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
               client.query(`SELECT 
               topic.id_topic, topic.name_topic, topic.description_topic,
               type_topic.id_type_topic, colaboration_topic.id_colaboration_topic, colaboration_topic.id_discipline
               FROM 
               topic, type_topic, colaboration_topic 
               WHERE 
               topic.id_topic = colaboration_topic.id_topic 
               AND
               type_topic.id_type_topic = colaboration_topic.id_type_topic
               AND
               topic.id_topic = $1
               GROUP BY 
               (topic.id_topic, type_topic.id_type_topic,colaboration_topic.id_colaboration_topic, colaboration_topic.id_discipline) 
               ORDER BY topic.id_topic ASC
               
               `, registry, function (err, result) {
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

module.exports = CrudTopic;