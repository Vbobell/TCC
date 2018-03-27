const CrudTeacherDiscipline = require('../../../../models/crud/crudTeacherDiscipline/crud-teacher-discipline');

class ManageTeacherDiscipline{
    constructor(){
        this.crudTeacherDiscipline = new CrudTeacherDiscipline();
        this.data = ''; 
    }
    getDataTeacherDiscipline(parameters, callback){
        this.crudTeacherDiscipline.selectTeachersAndDiscipline(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    insertDataTeacherDiscipline(parameters, callback) {
        let where = 'id_teacher = $1';
        let registry = [parameters.idTeacher];
        
        this.crudTeacherDiscipline.executeDelete('teacher_discipline', where, registry, data =>{
            this.crudTeacherDiscipline.executeInsert('teacher_discipline','(id_teacher, id_discipline)', '($1, $2)', 
            parameters.registers, response => callback(response));
        });
        
    }
}

module.exports = ManageTeacherDiscipline;