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
}

module.exports = CrudQuestionActivity;