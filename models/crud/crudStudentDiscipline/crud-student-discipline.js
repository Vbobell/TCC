const Crud = require('../generic-crud');

class CrudStudentDiscipline extends Crud{
    selectStudentsAndDiscipline(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
/*                 client.query(`SELECT student.id_student, student.name_student, 
                            discipline.id_discipline, discipline.name_discipline 
                            from student, discipline, student_discipline 
                            where student_discipline.id_student = student.id_student and 
                            discipline.id_discipline = student_discipline.id_discipline 
                            limit $1 offset $2;`, [limit, offset] , function (err, result) { */
                    client.query(`SELECT student.id_student, student.name_student, 
                    discipline.id_discipline, discipline.name_discipline 
                    from student, discipline, student_discipline 
                    where student_discipline.id_student = student.id_student and 
                    discipline.id_discipline = student_discipline.id_discipline`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectStudentDiscipline(registry, limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT student.id_student, student.name_student, 
                            discipline.id_discipline, discipline.name_discipline 
                            FROM student, discipline, student_discipline 
                            WHERE student_discipline.id_student = student.id_student AND 
                            discipline.id_discipline = student_discipline.id_discipline AND student.registry = $1`, [registry], function (err, result) {
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

module.exports = CrudStudentDiscipline;