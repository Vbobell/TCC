const CrudCourseDiscipline = require('../../../../models/crud/crudCourseDiscipline/crud-course-discipline');

class ManageCourseDiscipline{
    constructor(){
        this.crudCourseDiscipline = new CrudCourseDiscipline();
        this.data = ''; 
    }
    getDataCourseDiscipline(parameters, callback){
        this.crudCourseDiscipline.selectCoursesAndDiscipline(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    insertDataCourseDiscipline(data, callback) {
        this.crudCourseDiscipline.executeInsert('course_discipline','(id_course, id_discipline)', '($1, $2)', 
            data, response => callback(response));
    }
}

module.exports = ManageCourseDiscipline;