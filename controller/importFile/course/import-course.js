const CrudCourse = require('../../../models/crud/crudCourse/crud-course');

class CourseImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        let newData = [];
        for(var i = 0; i < this.data.length; i++){
            if(this.data[i].length > 0){
                newData.push(this.data[i].split(','));
            }
        }
        this.data = newData;
        return callback(this.data);
    }
    insertDataCourse(data, callback) {
        let crudCourse = new CrudCourse();
        crudCourse.executeInsert('course','(name_course, description_course)', '($1, $2)' , data, response => callback(response));
    }
}

module.exports = CourseImportController;