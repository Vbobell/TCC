const Crud = require('../generic-crud');

class CrudTeacherDiscipline extends Crud{
    selectTeachersAndDiscipline(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
/*                 client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                            discipline.id_discipline, discipline.name_discipline 
                            from teacher, discipline, teacher_discipline 
                            where teacher_discipline.id_teacher = teacher.id_teacher and 
                            discipline.id_discipline = teacher_discipline.id_discipline 
                            limit $1 offset $2;`, [limit, offset] , function (err, result) { */
                client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                            discipline.id_discipline, discipline.name_discipline 
                            from teacher, discipline, teacher_discipline 
                            where teacher_discipline.id_teacher = teacher.id_teacher and 
                            discipline.id_discipline = teacher_discipline.id_discipline`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectTeacherDiscipline(registry, limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
/*                 client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                            discipline.id_discipline, discipline.name_discipline 
                            from teacher, discipline, teacher_discipline 
                            where teacher_discipline.id_teacher = teacher.id_teacher and 
                            discipline.id_discipline = teacher_discipline.id_discipline 
                            limit $1 offset $2;`, [limit, offset] , function (err, result) { */
                client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                            discipline.id_discipline, discipline.name_discipline 
                            from teacher, discipline, teacher_discipline 
                            where teacher_discipline.id_teacher = teacher.id_teacher and 
                            discipline.id_discipline = teacher_discipline.id_discipline and teacher.registry = $1`, [registry], function (err, result) {
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

module.exports = CrudTeacherDiscipline;