const Crud = require('../generic-crud');

class CrudUserPoints extends Crud{
    selectStudentPoint(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT 
               points
               FROM student_points
               WHERE
               student_points.id_student = $1
               AND
               student_points.id_discipline = $2`, registry, function (err, result) {
                done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
}

module.exports = CrudUserPoints;