const CrudTeacher = require('../../../../models/crud/crudTeacher/crud-teacher');

class ManageTeacher{
    constructor(){
        this.crudTeacher = new CrudTeacher();
    }
    getDataTeachers(parametres, callback){
        this.crudTeacher.selectUsers(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeTeacher(parametres, callback){
        let where = 'id_teacher = $1';
        let registre = [parametres.idTeacher];
        this.crudTeacher.executeDelete('teacher', where, registre, data =>{
            return callback(data);
        });
    }
    editTeacher(parametres, callback){
        let values = '($1, $2)';
        let registre = [parametres.name, parametres.registre, parametres.idTeacher];
        let where = 'id_teacher = $3';
        this.crudTeacher.executeUpdate('teacher', '(name_teacher, registre)', values, where, registre, data => {
            return callback(data);
        });
    }
}

module.exports = ManageTeacher;