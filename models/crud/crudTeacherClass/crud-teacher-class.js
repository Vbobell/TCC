const Crud = require('../generic-crud');

class CrudTeacherClass extends Crud{
    selectTeachersAndClass(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                    client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                    class_.id_class, class_.name_class 
                    FROM teacher, class_, teacher_class 
                    WHERE teacher_class.id_teacher = teacher.id_teacher AND 
                    class_.id_class = teacher_class.id_class`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectTeacherClass(registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query(`SELECT teacher.id_teacher, teacher.name_teacher, 
                class_.id_class, class_.name_class 
                FROM teacher, class_, teacher_class 
                WHERE teacher_class.id_teacher = teacher.id_teacher AND 
                class_.id_class = teacher_class.id_class AND teacher.registry = $1`, [registry], function (err, result) {
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

module.exports = CrudTeacherClass;