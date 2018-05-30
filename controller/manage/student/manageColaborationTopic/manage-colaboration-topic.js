const CrudTopic = require('../../../../models/crud/crudTopic/crud-topic');
const CrudTypeTopic = require('../../../../models/crud/crudTypeTopic/type-topic');
const CrudColaborationTopic = require('../../../../models/crud/crudColaborationTopic/crud-colaboration-topic');
const CrudStudentTopic = require('../../../../models/crud/crudStudentTopic/crud-student-topic');

class ManageColaborationTopic{
    constructor(){
        this.crudTopic = new CrudTopic();
        this.crudTypeTopic = new CrudTypeTopic();
        this.crudColaborationTopic = new CrudColaborationTopic();
        this.crudStudentTopic = new CrudStudentTopic();
    }

    insertTopicProperties(parameters, callback){
        let that = this;

        that.insertTopic(parameters, (topicData) =>{
            that.insertColaborationTopic(parameters, (colaborationTopicData) =>{
                that.insertStudentTopic(parameters, (studentTopicData) =>{
                    let ids = {
                        "idTopic": topicData,
                        "idColaborationTopic": colaborationTopicData,
                        "idStudentTopic": studentTopicData 
                    };

                    return callback(ids);
                });
            });
        });
    }

    insertTopic(parameters, callback){
        let registry = [
            parameters.nameTopic,
            parameters.descriptionTopic
        ];

        this.crudTopic.executeUniqueInsert(
            'topic', 
            '(name_topic, description_topic)',
            '($1, $2)',
            'id_topic',
            registry,
            response => {
                return callback(topicData);
            });
    }

    insertColaborationTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idTypeTopic,
            parameters.id_discipline
        ];

        this.crudTopic.executeUniqueInsert(
            'colaboration_topic', 
            '(id_topic, id_type_topic, id_discipline)',
            '($1, $2, $3)',
            'id_colaboration_topic',
            registry,
            response => {
                return callback(colaborationTopicData);
            });
    }

    insertStudentTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idTypeTopic,
            parameters.id_discipline
        ];

        this.crudStudentTopic.executeUniqueInsert(
            'student_topic', 
            '(id_colaboration_topic, id_student)',
            '($1, $2)',
            'id_student_topic',
            registry,
            response => {
                return callback(studentTopicData);
            });
    }

    getDataTypeTopic(callback){
        this.crudTypeTopic.selectTypeTopic(data =>{
            return callback(data);
        });
    }
}

module.exports = ManageColaborationTopic;