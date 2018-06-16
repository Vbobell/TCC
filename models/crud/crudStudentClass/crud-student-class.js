const Crud = require('../generic-crud');

class CrudStudentClass extends Crud{
    selectStudentsAndClass(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                    client.query(`SELECT student.id_student, student.name_student, 
                    class_.id_class, class_.name_class 
                    FROM student, class_, student_class 
                    WHERE student_class.id_student = student.id_student AND 
                    class_.id_class = student_class.id_class`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectStudentClass(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT student.id_student, student.name_student, 
                class_.id_class, class_.name_class 
                FROM student, class_, student_class 
                WHERE student_class.id_student = student.id_student AND 
                class_.id_class = student_class.id_class AND student.registry = $1`, [registry], function (err, result) {
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

module.exports = CrudStudentClass;