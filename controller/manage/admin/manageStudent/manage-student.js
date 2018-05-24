const CrudStudent = require('../../../../models/crud/crudStudent/crud-student');
const crypto = require('crypto');

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
    editStudantUser(parameters, callback){
        let values = '($1, $2, $3, $4)';
        let password = crypto.createHash('md5').update(String(parameters.newPassword)).digest('hex');
        let registry = [parameters.nameUser, parameters.email, password, parameters.avatar, parameters.registry];
        let where = 'registry = $5';
        this.crudStudent.executeUpdate('student', '(name_student, email, password, user_identity)', values, where, registry, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        let hash = crypto.createHash('md5').update(parameters.password).digest('hex');
        this.crudStudent.selectUser(parameters.user, hash, data => {
            if(!data || data.length == 0){
                return callback(false);
            }else{
                return callback(data);
            }
        });
    }
    getDataStudentEdit(parameters, callback){
        this.crudStudent.selectUserEdit(parameters.idStudent, data =>{
            return callback(data);
        });
    }
}

module.exports = ManageStudent;