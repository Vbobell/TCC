const CrudCourseDiscipline = require('../../../../models/crud/crudCourseDiscipline/crud-course-discipline');

class ManageCourseDiscipline{
    constructor(){
        this.crudCourseDiscipline = new CrudCourseDiscipline();
    }
    getDataCourseDiscipline(parametres, callback){
        this.crudCourseDiscipline.selectCoursesAndDiscipline(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageCourseDiscipline;