const Crud = require('../generic-crud');

class CrudQuestionActivity extends Crud{
    selectQuestionActivityIds(idActivity, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT id_question FROM activity_question WHERE id_activity = $1 AND type_question <> 'draw'`, [idActivity], function (err, result) {
                    done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }
    selectQuestionObject(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                activity_question.id_question AS id,
                activity_question.type_question AS type,
                activity_question.description_question AS description
                FROM activity_question
                WHERE activity_question.id_activity = $1`, [parameters], function (err, result) {
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

module.exports = CrudQuestionActivity;