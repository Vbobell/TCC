const CrudStudent = require('../../../models/crud/crudStudent/crud-student');
const crypto = require('crypto');

class StudentImportController{
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
    insertDataStudent(data, callback) {
        this.generatedPassword(data, (registry) => {
            let crudStudent = new CrudStudent();
            crudStudent.executeInsert('student','(name_student, registry, email, password)', '($1, $2, $3, $4)' , 
            data, response => callback(response));
        });
    }
    generatedPassword(data, callback){
        for(var i = 0; i < data.length; i++){
            let hash = crypto.createHash('md5').update(String(data[i][1])).digest('hex');
            data[i].push(hash);
        }
        return callback(data);
    }
}

module.exports = StudentImportController;