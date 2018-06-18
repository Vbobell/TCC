const CrudTeacherClass = require('../../../../models/crud/crudTeacherClass/crud-teacher-class');

class ManageTeacherClass {
    constructor() {
        this.crudTeacherClass = new CrudTeacherClass();
        this.data = '';
    }
    getDataTeacherClass(callback) {
        this.crudTeacherClass.selectTeachersAndClass(data => {
            return callback(data);
        });
    }
    insertDataTeacherClass(parameters, callback) {
        let where = 'id_teacher = $1';
        let registry = [parameters.idTeacher];

        this.crudTeacherClass.executeDelete('teacher_class', where, registry, data => {
            this.crudTeacherClass.executeInsert('teacher_class', '(id_class, id_teacher)', '($1, $2)',
                parameters.registers,
                response => {return callback(response)}
            );
        });
    }
}

module.exports = ManageTeacherClass;