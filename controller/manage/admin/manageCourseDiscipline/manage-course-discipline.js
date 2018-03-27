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
    insertDataCourseDiscipline(parameters, callback) {
        let where = 'id_course = $1';
        let registry = [parameters.idCourse];

        this.crudCourseDiscipline.executeDelete('course_discipline', where, registry, data =>{
            this.crudCourseDiscipline.executeInsert('course_discipline','(id_course, id_discipline)', '($1, $2)', 
                parameters.registers, response => 
                callback(response)
            );
        });
    }
}

module.exports = ManageCourseDiscipline;