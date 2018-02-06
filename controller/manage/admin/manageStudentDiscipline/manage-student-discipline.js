const CrudStudentDiscipline = require('../../../../models/crud/crudStudentDiscipline/crud-student-discipline');

class ManageStudentDiscipline{
    constructor(){
        this.crudStudentDiscipline = new CrudStudentDiscipline();
        this.data = ''; 
    }
    getDataStudentDiscipline(parametres, callback){
        this.crudStudentDiscipline.selectStudentsAndDiscipline(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    insertDataStudentDiscipline(data, callback) {
        this.this.crudStudentDiscipline.executeInsert('student_discipline','(id_student, id_discipline)', '($1, $2)', 
            data, response => callback(response));
    }
}

module.exports = ManageStudentDiscipline;