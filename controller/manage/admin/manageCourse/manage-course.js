const CrudCourse = require('../../../../models/crud/crudCourse/crud-course');

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
        let values = '($1, $2)';
        let registre = [parametres.nameCourse, parametres.descriptionCourse, parametres.idCourse];
        let where = 'id_course = $3';
        this.crudCourse.executeUpdate('course', '(name_course, description_course)', values, where, registre, data => {
            return callback(data);
        });
    }
}

module.exports = ManageCourse;