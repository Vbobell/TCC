const CrudTeacherTopic = require('../../../../models/crud/crudTeacherTopic/crud-teacher-topic');

class ManageDisciplineTopic{
    constructor(){
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
}

module.exports = ManageDisciplineTopic;