const CrudTopic = require('../../../../models/crud/crudTopic/crud-topic');
const CrudTypeTopic = require('../../../../models/crud/crudTypeTopic/type-topic');
const CrudColaborationTopic = require('../../../../models/crud/crudColaborationTopic/crud-colaboration-topic');
const CrudTeacherTopic = require('../../../../models/crud/crudTeacherTopic/crud-teacher-topic');

class ManageColaborationTopic{
    constructor(){
        this.crudTopic = new CrudTopic();
        this.crudTypeTopic = new CrudTypeTopic();
        this.crudColaborationTopic = new CrudColaborationTopic();
        this.crudTeacherTopic = new CrudTeacherTopic();
    }

    /* Insert methods */
    insertTopicProperties(parameters, callback){
        let that = this;

        that.insertTopic(parameters, (topicData) =>{
            parameters.idTopic = topicData[0].id_topic;

            that.insertColaborationTopic(parameters, (colaborationData) =>{
                that.insertTeacherTopic(parameters, (teacherTopicData) =>{
                    let ids = {
                        "idTopic": topicData[0].id_topic,
                        "idColaborationTopic": colaborationData[0].id_colaboration_topic,
                        "idTeacherTopic": teacherTopicData[0].id_teacher_topic
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

    insertTeacherTopic(parameters, callback){
        let registry = [
            parameters.idTopic,
            parameters.idTeacher
        ];

        this.crudTeacherTopic.executeUniqueInsert(
            'teacher_topic', 
            '(id_colaboration_topic, id_teacher)',
            '($1, $2)',
            'id_teacher_topic',
            registry,
            (teacherTopicData) => {
                return callback(teacherTopicData);
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

        this.crudTopic.executeUpdate(
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

        this.crudColaborationTopic.executeUpdate(
            'colaboration_topic', 
            '(id_type_topic)',
            '($1)',
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
}

module.exports = ManageColaborationTopic;