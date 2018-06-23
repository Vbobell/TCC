const Crud = require('../generic-crud');

class CrudStudentActivity extends Crud{
    selectActivityPoint(registry, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return callback(false);
                }
               client.query(`SELECT id_activity, point_rechead 
               FROM student_activity WHERE id_student = $1`, registry, function (err, result) {
                done();
                    if (err) {
                        return callback(false);
                    }
                    return callback(result.rows);
                });
            });
        });
    }
    selectStudentsResults(registry, callback){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return callback(false);
                }
               client.query(`SELECT id_student, point_rechead 
               FROM student_activity, activity 
               WHERE student_activity.id_activity = activity.id_activity
               AND activity.id_discipline = $1
               AND activity.id_class = $2`, registry, function (err, result) {
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

module.exports = CrudStudentActivity;