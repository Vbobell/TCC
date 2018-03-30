const Crud = require('../generic-crud');

class CrudDisciplineActivity extends Crud{
    selectAcivity(registry, limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                /* client.query(`SELECT id_activity, name_activity 
                FROM activity, discipline WHERE
                activity.id_discipline =  discipline.id_discipline
                AND discipline.id_discipline = $1
                ORDER BY name_activity ASC LIMIT $1 OFFSET $2;`, [registry, limit, offset] , function (err, result) {
                */
               client.query(`SELECT id_activity, name_activity, description_activity 
                FROM activity, discipline, teacher WHERE
                activity.id_discipline =  discipline.id_discipline
                AND activity.id_teacher = teacher.id_teacher
                AND discipline.id_discipline = $1
                AND teacher.id_teacher = $2
                ORDER BY name_activity ASC`, registry, function (err, result) {
                done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
}

module.exports = CrudDisciplineActivity;