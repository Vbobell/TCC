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
}

module.exports = ManageCourse;