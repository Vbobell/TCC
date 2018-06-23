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
                (SELECT id_activity FROM student_activity WHERE id_student = $1)
                AND id_discipline = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectFirstCorrectActivity(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM student_reward, activity, student_activity
                WHERE student_reward.id_student = $1 
                AND student_reward.id_reward = 2
                AND activity.id_discipline = $2
                AND student_activity.id_activity = activity.id_activity`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectFirstDoActivity(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM student_activity, activity  
                WHERE student_activity.id_activity = $1
                AND student_activity.id_activity = activity.id_activity
                AND activity.id_discipline = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCorrectActivity(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM student_activity, activity  
                WHERE student_activity.id_activity = activity.id_activity
                AND student_activity.point_rechead = activity.point_activity
                AND student_activity.id_activity = $1
                AND student_activity.id_student = $2
                AND activity.id_discipline = $3`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectCheckActivitySequence(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, student_activity
                WHERE activity.id_activity = student_activity.id_activity
                AND activity.id_discipline = $1
                AND student_activity.id_student = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCheckActivityGold(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, activity_reward
                WHERE activity.id_activity = activity_reward.id_activity
                AND activity_reward.id_reward = 6
                AND activity.id_activity = $1`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCheckActivitySilver(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, activity_reward
                WHERE activity.id_activity = activity_reward.id_activity
                AND activity_reward.id_reward = 7
                AND activity.id_activity = $1`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectCheckActivityBronze(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, activity_reward
                WHERE activity.id_activity = activity_reward.id_activity
                AND activity_reward.id_reward = 8
                AND activity.id_activity = $1`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCheckActivityGoldSequence(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, student_activity, student_reward
                WHERE activity.id_activity = student_activity.id_activity
                AND activity.id_discipline = $1
                AND student_activity.id_student = $2
                AND student_reward.id_reward = 6
                AND student_reward.id_student = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCheckActivitySilverSequence(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, student_activity, student_reward
                WHERE activity.id_activity = student_activity.id_activity
                AND activity.id_discipline = $1
                AND student_activity.id_student = $2
                AND student_reward.id_reward = 7
                AND student_reward.id_student = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectCheckActivityBronzeSequence(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT count(*) 
                FROM activity, student_activity, student_reward
                WHERE activity.id_activity = student_activity.id_activity
                AND activity.id_discipline = $1
                AND student_activity.id_student = $2
                AND student_reward.id_reward = 8
                AND student_reward.id_student = $2`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }

    selectRewards(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT
                    discipline.id_discipline AS disciplineId,
                    discipline.name_discipline AS disciplineName,
                    reward.id_reward AS id, 
                    reward.file_reward AS file,
                    reward.name_reward AS name,
                    reward.description_reward AS description
                    FROM reward, student_reward, discipline, student, student_discipline
                    WHERE reward.id_reward = student_reward.id_reward
                    AND discipline.id_discipline = student_discipline.id_discipline
                    AND student.id_student = student_discipline.id_student
                    AND student.id_student = student_reward.id_student
                    AND student.registry = $1
                    GROUP BY reward.id_reward, discipline.id_discipline
                    ORDER BY reward.id_reward`, registry, function (err, result) {
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