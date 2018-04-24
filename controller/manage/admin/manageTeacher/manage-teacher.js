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
    editTeacherUser(parameters, callback){
        let values = '($1, $2, $3, $4)';
        let password = crypto.createHash('md5').update(String(parameters.newPassword)).digest('hex');
        let registry = [parameters.nameUser, parameters.email, password, parameters.avatar, parameters.registry];
        let where = 'registry = $5';
        this.crudTeacher.executeUpdate('teacher', '(name_teacher, email, password, user_identity)', values, where, registry, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        let hash = crypto.createHash('md5').update(parameters.password).digest('hex');
        this.crudTeacher.selectUser(parameters.user,hash, data => {
            if(!data || data.length == 0){
                return callback(false);
            }else{
                return callback(data);
            }
        });
    }
    getDataAdminEdit(parameters, callback){
        this.crudTeacher.selectUserEdit(parameters.idTeacher, data =>{
            return callback(data);
        });
    }
}

module.exports = ManageTeacher;