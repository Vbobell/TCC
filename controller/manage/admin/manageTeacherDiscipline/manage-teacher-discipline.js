const CrudTeacherDiscipline = require('../../../../models/crud/crudTeacherDiscipline/crud-teacher-discipline');

class ManageTeacherDiscipline{
    constructor(){
        this.crudTeacherDiscipline = new CrudTeacherDiscipline();
        this.data = ''; 
    }
    getDataTeacherDiscipline(parametres, callback){
        this.crudTeacherDiscipline.selectTeachersAndDiscipline(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    insertDataTeacherDiscipline(data, callback) {
        this.crudTeacherDiscipline.executeInsert('teacher_discipline','(id_teacher, id_discipline)', '($1, $2)', 
            data, response => callback(response));
    }
}

module.exports = ManageTeacherDiscipline;