const CrudCourse = require('../../../../models/crud/crudCourse/crud-course');

class ManageCourse{
    constructor(){
        this.crudCourse = new CrudCourse();
    }
    getDataCourses(parameters, callback){
        this.crudCourse.selectCourses(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    removeCourse(parameters, callback){
        let where = 'id_course = $1';
        let registry = [parameters.idCourse];
        this.crudCourse.executeDelete('course', where, registry, data =>{
            return callback(data);
        });
    }
    editCourse(parameters, callback){
        let values = '($1, $2)';
        let registry = [parameters.nameCourse, parameters.descriptionCourse, parameters.idCourse];
        let where = 'id_course = $3';
        this.crudCourse.executeUpdate('course', '(name_course, description_course)', values, where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageCourse;