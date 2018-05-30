const Crud = require('../generic-crud');

class CrudTypeTopic extends Crud{
    selectTypeTopic(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT id_type_topic,name_type_topic, description_type_topic, point_type_topic, file_type_topic FROM type_topic ORDER BY id_type_topic ASC`, function (err, result) {
                done();
                    if (err) {
                        return json(false);
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
}

module.exports = CrudTypeTopic;