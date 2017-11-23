const CrudCourse = require('../../../models/crud/crudCourse/crud-course');

class ManageCourse{
    constructor(){
        this.crudCourse = new CrudCourse();
    }
    getDataCourses(parametres, callback){
        this.crudCourse.selectCourses(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeCourse(parametres, callback){
        let where = 'id_course = $1';
        let registre = [parametres.idCourse];
        this.crudCourse.executeDelete('course', where, registre, data =>{
            return callback(data);
        });
    }
}

module.exports = ManageCourse;