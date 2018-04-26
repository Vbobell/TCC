const Crud = require('../generic-crud');

class CrudAlternativeQuestion extends Crud{
    selectAlternativeQuestion(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                question_alternative.id_alternative AS id,
                question_alternative.correct_alternative AS correct,
                question_alternative.description_alternative AS description
                FROM question_alternative
                WHERE question_alternative.id_question = $1
                ORDER BY question_alternative.id_alternative`, [parameters], function (err, result) {
                    done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }
    selectAlternativeQuestionRA(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                question_alternative.id_alternative AS id,
                false AS correct,
                question_alternative.description_alternative AS description
                FROM question_alternative
                WHERE question_alternative.id_question = $1
                ORDER BY question_alternative.id_alternative`, [parameters], function (err, result) {
                    done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }

    selectAlternativeQuestionCorrect(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                question_alternative.id_alternative AS id
                FROM question_alternative
                WHERE question_alternative.id_question = $1
                AND correct_alternative = true`, [parameters], function (err, result) {
                    done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }
}

module.exports = CrudAlternativeQuestion;