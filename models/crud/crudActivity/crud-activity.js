const Crud = require('../generic-crud');

class CrudActivity extends Crud{
    selectActivityObject(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                activity.name_activity AS nameActivity, 
                activity.description_activity AS descriptionActivity,
                activity.point_activity AS pointActivity,
                activity.id_discipline AS idDiscipline,
                activity.id_teacher AS idTeacher
                FROM activity
                WHERE activity.id_activity = $1
                AND activity.id_teacher = $2`, parameters, function (err, result) {
                    done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }
    selectActivity(parameters, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {

                if (err) {
                    return callback(false);
                }
                
                client.query(`SELECT 
                activity.name_activity AS nameActivity, 
                activity.description_activity AS descriptionActivity,
                activity.point_activity AS pointActivity,
                activity.id_discipline AS idDiscipline
                FROM activity
                WHERE activity.id_activity = $1`, parameters, function (err, result) {
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

module.exports = CrudActivity;