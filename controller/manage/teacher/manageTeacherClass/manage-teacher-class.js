const CrudTeacherClass = require('../../../../models/crud/crudTeacherClass/crud-teacher-class');

class ManageTeacherClass{
    constructor(){
        this.crudTeacherClass = new CrudTeacherClass();
        this.data = ''; 
    }
    getDataTeacherDiscipline(parameters, callback){
        this.crudTeacherClass.selectTeacherClass(parameters.registry, data =>{
            return callback(data);
        });
    }
}

module.exports = ManageTeacherClass;