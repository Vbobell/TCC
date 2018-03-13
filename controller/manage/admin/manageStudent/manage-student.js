const CrudStudent = require('../../../../models/crud/crudStudent/crud-student');

class ManageStudent{
    constructor(){
        this.crudStudent = new CrudStudent();
    }
    getDataStudents(parameters, callback){
        this.crudStudent.selectUsers(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    removeStudent(parameters, callback){
        let where = 'id_student = $1';
        let registry = [parameters.idStudent];
        this.crudStudent.executeDelete('student', where, registry, data =>{
            return callback(data);
        });
    }
    editStudent(parameters, callback){
        let values = '($1, $2, $3)';
        let registry = [parameters.name, parameters.registry, parameters.email, parameters.idStudent];
        let where = 'id_student = $4';
        this.crudStudent.executeUpdate('student', '(name_student, registry, email)', values, where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageStudent;