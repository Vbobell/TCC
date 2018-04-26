const CrudStudentDiscipline = require('../../../../models/crud/crudStudentDiscipline/crud-student-discipline');

class ManageStudentDiscipline{
    constructor(){
        this.crudStudentDiscipline = new CrudStudentDiscipline();
        this.data = ''; 
    }
    getDataStudentDiscipline(parameters, callback){
        this.crudStudentDiscipline.selectStudentDiscipline(parameters.registry, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageStudentDiscipline;