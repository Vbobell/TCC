const CrudStudentTopic = require('../../../../models/crud/crudStudentTopic/crud-student-topic');

class ManageDisciplineTopic{
    constructor(){
        this.crudStudentTopic = new CrudStudentTopic();
    }

    getDisciplineTopic(parameters, callback){
        let  registry = [
            parameters.idDiscipline
        ]

        this.crudStudentTopic.selectDisciplineTopics(registry, (disciplineTopics) =>{
            return callback(disciplineTopics);
        });
    }

    getMyDisciplineTopic(parameters, callback){
        let  registry = [
            parameters.idDiscipline,
            parameters.idStudent
        ]

        this.crudStudentTopic.selectMyDisciplineTopics(registry, (disciplineTopics) =>{
            return callback(disciplineTopics);
        });
    }
}

module.exports = ManageDisciplineTopic;