const CrudStudent = require('../../../models/crud/crudStudent/crud-student');
const crypto = require('crypto');

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
        this.generatedPassword(data, (registry) => {
            let crudStudent = new CrudStudent();
            crudStudent.executeInsert('student','(name_student, registry, email, password)', '($1, $2, $3, $4)' , 
            data, response => callback(response));
        });
    }
    generatedPassword(data, callback){
        data.forEach((registry, index) => {
            let hash = crypto.createHash('md5').update(registry[1]).digest('hex');
            data[index].push(hash);
        });
        return callback(data);
    }
}

module.exports = StudentImportController;