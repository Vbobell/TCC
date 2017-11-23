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
    editCourse(parametres, callback){
        let values = '($1)';
        let registre = [parametres.nameCourse];
        let where = 'id_course = $3';
        this.crudAdmin.executeUpdate('course', '(name_course)', values, where, registre, data => {
            return callback(data);
        });
    }
}

module.exports = ManageCourse;