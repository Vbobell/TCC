const CrudTeacherTopic = require('../../../../models/crud/crudTeacherTopic/crud-teacher-topic');
const CrudStudentTopic = require('../../../../models/crud/crudStudentTopic/crud-student-topic');

class ManageDisciplineTopic{
    constructor(){
        this.crudStudentTopic = new CrudStudentTopic();
        this.crudTeacherTopic = new CrudTeacherTopic();
    }

    getDisciplineTopic(parameters, callback){
        let  registry = [
            parameters.idDiscipline
        ]

        this.crudTeacherTopic.selectDisciplineTopics(registry, (disciplineTopics) =>{
            return callback(disciplineTopics);
        });
    }

    getMyDisciplineTopic(parameters, callback){
        let  registry = [
            parameters.idDiscipline,
            parameters.idTeacher
        ]

        this.crudTeacherTopic.selectMyDisciplineTopics(registry, (disciplineTopics) =>{
            return callback(disciplineTopics);
        });
    }

    getDisciplineAllTopics(parameters, callback){
        let that = this;
        let  registry = [
            parameters.idDiscipline
        ]
        let topics = [];

        this.crudStudentTopic.selectViewDisciplineAllTopics(registry, (dataTopicStudent) =>{
            topics = topics.concat(dataTopicStudent);

            that.crudTeacherTopic.selectViewDisciplineAllTopics(registry, (dataTopicTeacher) =>{
                topics = topics.concat(dataTopicTeacher);
                return callback(topics);
            });
        });
    }
}

module.exports = ManageDisciplineTopic;