const CrudAlternativeQuestion = require('../../../../models/crud/crudAlternativeQuestion/crud-alternative-question');

class ManageAlternativeQuestion{
    constructor(){
        this.crudAlternativeQuestion = new CrudAlternativeQuestion();
        this.data = ''; 
    }

    insertDataAlternative(parameters, idQuestion, callback){
        let registry = [
            parameters.description,
            parameters.correct,
            idQuestion
        ] 

        this.crudAlternativeQuestion.executeUniqueInsert(
            'question_alternative', 
            '(description_alternative, correct_alternative, id_question)',
            '($1, $2, $3)',
            'id_alternative',
            registry,
            response => {
                callback(response);
            });
    }

    removeDataAlternative(idQuestions, callback){
        let where = "id_question = ANY($1::int[])";

        this.crudAlternativeQuestion.executeDelete(
            'question_alternative',
            where,
            [idQuestions],
            response =>{
                callback(response);
            }
        );
    }
}

module.exports = ManageAlternativeQuestion;