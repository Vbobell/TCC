const CrudStudent = require('../../../models/crud/crudStudent/crud-student');

class StudentImportController{
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
    insertDataStudent(data, callback) {
        let crudStudent = new CrudStudent();
        crudStudent.executeInsert('student','(name_student, registry, email)', '($1, $2, $3)' , 
        data, response => callback(response));
    }
}

module.exports = StudentImportController;