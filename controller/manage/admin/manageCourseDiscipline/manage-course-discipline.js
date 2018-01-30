const CrudCourseDiscipline = require('../../../../models/crud/crudCourseDiscipline/crud-course-discipline');

class ManageCourseDiscipline{
    constructor(){
        this.crudCourseDiscipline = new CrudCourseDiscipline();
        this.data = ''; 
    }
    getDataCourseDiscipline(parametres, callback){
        this.crudCourseDiscipline.selectCoursesAndDiscipline(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    insertDataCourseDiscipline(data, callback) {
        console.log(data);
        this.crudCourseDiscipline.executeInsert('course_discipline','(id_course, id_discipline)', '($1, $2)', 
            data, response => callback(response));
    }
}

module.exports = ManageCourseDiscipline;