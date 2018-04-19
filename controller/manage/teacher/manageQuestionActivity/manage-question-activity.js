const CrudQuestionActivity = require('../../../../models/crud/crudQuestionActivity/crud-question-activity');

class ManageQuestionActivity{
    constructor(){
        this.crudQuestionActivity = new CrudQuestionActivity();
        this.data = ''; 
    }
    insertDataQuestion(parameters, idActivity, callback){
        let registry = [
            parameters.type,
            parameters.description,
            idActivity
        ] 

        this.crudQuestionActivity.executeUniqueInsert(
            'activity_question', 
            '(type_question, description_question, id_activity)',
            '($1, $2, $3)',
            'id_question',
            registry,
            response => {
                callback(response);
            });
    }

    removeDataQuestions(idActivity, callback){
        let where = "id_activity = $1";

        this.crudQuestionActivity.executeDelete(
            'activity_question',
            where,
            [idActivity],
            response =>{
                callback(response);
            }
        );
    }

    getQuestionActivityIds(idActivity, callback){
        this.crudQuestionActivity.selectQuestionActivityIds(idActivity, data => {
            let ids = [];
            data.forEach(question => {
                ids.push(question.id_question);
            });
                callback(ids);
        });
    }

    getQuestionObject(idActivity, callback){
        this.crudQuestionActivity.selectQuestionObject(idActivity, objectQuestion => {
            callback(objectQuestion);
        });
    }
}

module.exports = ManageQuestionActivity;