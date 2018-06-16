const CrudStudentClass = require('../../../../models/crud/crudStudentClass/crud-student-class');

class ManageStudentClass {
    constructor() {
        this.crudStudentClass = new CrudStudentClass();
        this.data = '';
    }
    getDataStudentClass(callback) {
        this.crudStudentClass.selectStudentsAndClass(data => {
            return callback(data);
        });
    }
    insertDataStudentClass(parameters, callback) {
        let where = 'id_student = $1';
        let registry = [parameters.idStudent];

        this.crudStudentClass.executeDelete('student_class', where, registry, data => {
            this.crudStudentClass.executeInsert('student_class', '(id_class, id_student)', '($1, $2)',
                parameters.registers,
                response => {return callback(response)}
            );
        });
    }
}

module.exports = ManageStudentClass;