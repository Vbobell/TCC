const CrudStudentDiscipline = require('../../../../models/crud/crudStudentDiscipline/crud-student-discipline');

class ManageStudentDiscipline{
    constructor(){
        this.crudStudentDiscipline = new CrudStudentDiscipline();
        this.data = ''; 
    }
    getDataStudentDiscipline(parameters, callback){
        this.crudStudentDiscipline.selectStudentsAndDiscipline(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    insertDataStudentDiscipline(parameters, callback) {
        let where = 'id_student = $1';
        let registry = [parameters.idStudent];

        this.crudStudentDiscipline.executeDelete('student_discipline', where, registry, data =>{
            this.crudStudentDiscipline.executeInsert('student_discipline','(id_student, id_discipline)', '($1, $2)', 
                parameters.registers, 
                response => callback(response)
                );
            });
    }
}

module.exports = ManageStudentDiscipline;