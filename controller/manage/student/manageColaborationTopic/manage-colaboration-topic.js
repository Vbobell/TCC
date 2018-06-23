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

    /* Insert methods */
    insertTopicProperties(parameters, callback){
        let that = this;

        that.insertTopic(parameters, (topicData) =>{
            parameters.idTopic = topicData[0].id_topic;

            that.insertColaborationTopic(parameters, (colaborationData) =>{
                that.insertStudentTopic(parameters, (studentTopicData) =>{
                    let ids = {
                        "idTopic": topicData[0].id_topic,
                        "idColaborationTopic": colaborationData[0].id_colaboration_topic,
                        "idStudentTopic": studentTopicData[0].id_student_topic
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
            (topicData) => {
                return callback(topicData);
            });
    }

    insertColaborationTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idTypeTopic,
            parameters.idDiscipline
        ];

        this.crudTopic.executeUniqueInsert(
            'colaboration_topic', 
            '(id_topic, id_type_topic, id_discipline)',
            '($1, $2, $3)',
            'id_colaboration_topic',
            registry,
            (colaborationTopicData) => {
                return callback(colaborationTopicData);
            });
    }

    insertStudentTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idStudent
        ];

        this.crudStudentTopic.executeUniqueInsert(
            'student_topic', 
            '(id_colaboration_topic, id_student)',
            '($1, $2)',
            'id_student_topic',
            registry,
            (studentTopicData) => {
                return callback(studentTopicData);
            });
    }
    /* Insert methods */

    /* Update methods */
    updateTopicProperties(parameters, callback){
        let that = this;

        that.updateTopic(parameters, (dataTopic) =>{
            that.updateColaborationTopic(parameters, (dataColaboration) =>{

                let returnData = {
                    "dataTopic": dataTopic,
                    "dataColaboration": dataColaboration
                };
                
                return callback(returnData);
            });
        });
    }

    updateTopic(parameters, callback){
        let registry = [
            parameters.nameTopic,
            parameters.descriptionTopic,
            parameters.idTopic
        ];

        let where = 'id_topic = $3';

        this.crudStudentTopic.executeUpdate(
            'topic', 
            '(name_topic, description_topic)',
            '($1, $2)',
            where,
            registry,
            response => {
                return callback(response);
            });
    }

    updateColaborationTopic(parameters, callback){
        let registry = [
            parameters.idTypeTopic,
            parameters.idColaborationTopic
        ];

        let where = 'id_topic = $2';

        this.crudStudentTopic.executeUpdateSet(
            'colaboration_topic', 
            'id_type_topic = $1',
            where,
            registry,
            response => {
                return callback(response);
            });
    }
    /* Update methods */

    getDataTypeTopic(callback){
        this.crudTypeTopic.selectTypeTopic(data =>{
            return callback(data);
        });
    }

    getDataTopic(parameters, callback){
        let registry = [
            parameters.idTopic
        ];

        this.crudTopic.selectTopicEdit(registry, (data) =>{
            return callback(data);
        });
    }

    updateResolvedTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idStudent,
            parameters.resolved
        ];

        let where = `topic.id_topic = $1 
                     AND topic.id_topic = colaboration_topic.id_topic 
                     AND colaboration_topic.id_colaboration_topic = student_topic.id_colaboration_topic 
                     AND student_topic.id_student = $2`;

        this.crudStudentTopic.executeUpdateSet(
            'topic', 
            'resolved = FROM colaboration_topic, student_topic ',
            where,
            registry,
            response => {
                return callback(response);
            });
    }
}

module.exports = ManageColaborationTopic;