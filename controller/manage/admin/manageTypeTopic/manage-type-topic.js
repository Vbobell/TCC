const CrudTypeTopic = require('../../../../models/crud/crudTypeTopic/type-topic');

class ManageTypeTopic{
    constructor(){
        this.crudTypeTopic = new CrudTypeTopic();
    }
    getDataTypeTopic(parameters, callback){
        this.crudTypeTopic.selectTypeTopic(data =>{
            return callback(data);
        });
    }
    editTypeTopic(parameters, callback){
        let registry = [parameters.point, parameters.id];
        let where = 'id_type_topic = $2';
        this.crudTypeTopic.executeUpdateSet('type_topic', 'point_type_topic = $1', where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageTypeTopic;
