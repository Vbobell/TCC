const CrudStudent = require('../../../../models/crud/crudStudent/crud-student');

class ManageStudent{
    constructor(){
        this.crudStudent = new CrudStudent();
    }
    getDataStudents(parametres, callback){
        this.crudStudent.selectUsers(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeStudent(parametres, callback){
        let where = 'id_student = $1';
        let registry = [parametres.idStudent];
        this.crudStudent.executeDelete('student', where, registry, data =>{
            return callback(data);
        });
    }
    editStudent(parametres, callback){
        let values = '($1, $2, $3)';
        let registry = [parametres.name, parametres.registry, parametres.email, parametres.idStudent];
        let where = 'id_student = $4';
        this.crudStudent.executeUpdate('student', '(name_student, registry, email)', values, where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageStudent;