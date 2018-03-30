const CrudTeacherDiscipline = require('../../../../models/crud/crudTeacherDiscipline/crud-teacher-discipline');

class ManageTeacherDiscipline{
    constructor(){
        this.crudTeacherDiscipline = new CrudTeacherDiscipline();
        this.data = ''; 
    }
    getDataTeacherDiscipline(parameters, callback){
        this.crudTeacherDiscipline.selectTeacherDiscipline(parameters.registry, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageTeacherDiscipline;