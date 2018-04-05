const CrudTeacher = require('../../../../models/crud/crudTeacher/crud-teacher');
const crypto = require('crypto');

class ManageTeacher{
    constructor(){
        this.crudTeacher = new CrudTeacher();
    }
    getDataTeachers(parameters, callback){
        this.crudTeacher.selectUsers(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    removeTeacher(parameters, callback){
        let where = 'id_teacher = $1';
        let registry = [parameters.idTeacher];
        this.crudTeacher.executeDelete('teacher', where, registry, data =>{
            return callback(data);
        });
    }
    editTeacher(parameters, callback){
        let values = '($1, $2)';
        let registry = [parameters.name, parameters.registry, parameters.idTeacher];
        let where = 'id_teacher = $3';
        this.crudTeacher.executeUpdate('teacher', '(name_teacher, registry)', values, where, registry, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        let hash = crypto.createHash('md5').update(parameters.password).digest('hex');
        this.crudTeacher.selectUser(parameters.user,hash, data => {
            if(data.length == 0){
                return callback(false);
            }else{
                return callback(data);
            }
        });
    }
}

module.exports = ManageTeacher;