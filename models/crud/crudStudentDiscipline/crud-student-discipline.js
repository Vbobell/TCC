const Crud = require('../generic-crud');

class CrudStudentDiscipline extends Crud{
    selectStudentsAndDiscipline(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(`SELECT student.id_student, student.name_student, 
                            discipline.id_discipline, discipline.name_discipline 
                            from student, discipline, student_discipline 
                            where student_discipline.id_student = student.id_student and 
                            discipline.id_discipline = student_discipline.id_discipline 
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

module.exports = CrudStudentDiscipline;