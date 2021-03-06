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
                return callback(response);
            });
    }

    removeDataAlternative(idQuestions, callback){
        let where = "id_question = ANY($1::int[])";

        this.crudAlternativeQuestion.executeDelete(
            'question_alternative',
            where,
            [idQuestions],
            response =>{
                return callback(response);
            }
        );
    }

    getAlternativeQuestion(idQuestion, callback){
        this.crudAlternativeQuestion.selectAlternativeQuestion(idQuestion, alternative => {
            return callback(alternative);
        });
    }

    getAlternativeQuestionRA(idQuestion, callback){
        this.crudAlternativeQuestion.selectAlternativeQuestionRA(idQuestion, alternative => {
            return callback(alternative);
        });
    }

    getAlternativeQuestionCorrect(question, callback){
        let that = this;
        let correct = false;
        let count = 0;

        if(typeof question.alternatives == "string"){
            return callback(true);
        }else if(question.type == "unique"){
            this.crudAlternativeQuestion.selectAlternativeQuestion(question.id, alternatives => {
                question.alternatives.forEach((alternative, index) => {
                    if(alternatives[index].correct && alternative.correct == alternatives[index].correct){
                        correct = true;
                    }

                    if(count == (question.alternatives.length-1)){
                        return callback(correct);
                    }
                    count++;
                });
            });
        }else{
            this.crudAlternativeQuestion.selectAlternativeQuestion(question.id, alternatives => {
                let amountCorrect = 0;
                question.alternatives.forEach((alternative, index) => {
                    
                    amountCorrect += alternatives[index].correct == true ? 1 : 0;

                    if(alternatives[index].correct && alternative.correct == alternatives[index].correct){
                        correct += 1;
                    }

                    if(count == (question.alternatives.length-1)){
                        correct = correct / amountCorrect * 100 >= 70;
                        return callback(correct);
                    }
                    count++;
                });
            });
        }
    }
}

module.exports = ManageAlternativeQuestion;