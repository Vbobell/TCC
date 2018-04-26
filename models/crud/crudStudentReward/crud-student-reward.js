const Crud = require('../generic-crud');

class CrudStudentReward extends Crud{
    selectStudentReward(registry, limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT id_reward FROM student_reward WHERE id_student = $1`, [registry], function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectFirstActivity(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) FROM activity WHERE id_activity IN 
                (SELECT id_activity FROM student_activity WHERE id_student = $1)`, registry, function (err, result) {
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

module.exports = CrudStudentReward;