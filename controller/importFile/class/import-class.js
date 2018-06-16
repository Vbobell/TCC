const CrudClass = require('../../../models/crud/crudClass/crud-class');

class ClassImportController {
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
    insertDataClass(data, callback) {
        let crudClass = new CrudClass();
        crudClass.executeInsert('class_','(name_class)', '($1)' , data, response => callback(response));
    }
}

module.exports = ClassImportController;