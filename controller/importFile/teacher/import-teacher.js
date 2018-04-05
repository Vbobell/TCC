const CrudTeacher = require('../../../models/crud/crudTeacher/crud-teacher');
const crypto = require('crypto');

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
        this.generatedPassword(data, (registry) => {
            let crudTeacher = new CrudTeacher();
            crudTeacher.executeInsert('teacher','(name_teacher, registry, email, password)', '($1, $2, $3, $4)' , 
            registry, response => callback(response));
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

module.exports = TeacherImportController;