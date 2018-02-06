const Crud = require('../generic-crud');

class CrudTeacherDiscipline extends Crud{
    selectTeachersAndDiscipline(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                            discipline.id_discipline, discipline.name_discipline 
                            from teacher, discipline, teacher_discipline 
                            where teacher_discipline.id_teacher = teacher.id_teacher and 
                            discipline.id_discipline = teacher_discipline.id_discipline 
                            limit $1 offset $2;`, [limit, offset] , function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
}

module.exports = CrudTeacherDiscipline;