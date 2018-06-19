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
}

module.exports = CrudStudentActivity;