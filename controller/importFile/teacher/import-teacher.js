const CrudTeacher = require('../../../models/crud/crudTeacher/crud-teacher');

class TeacherImportController{
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        let newData = [];
        for(var i = 0; i < this.data.length; i++){
            newData.push(this.data[i].split(','));
        }
        this.data = newData;
        return callback(this.data);
    }
    insertDataTeacher(data, callback) {
        let crudTeacher = new CrudTeacher();
        crudTeacher.executeInsert('teacher','(name_teacher, registry, email)', '($1, $2, $3)' , 
        data, response => callback(response));
    }
}

module.exports = TeacherImportController;