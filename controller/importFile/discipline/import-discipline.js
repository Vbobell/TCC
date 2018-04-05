const CrudDiscipline = require('../../../models/crud/crudDiscipline/crud-discipline');

class DisciplineImportController{
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
    insertDataDiscipline(data, callback) {
        let crudDiscipline = new CrudDiscipline();
        crudDiscipline.executeInsert('discipline','(name_discipline, description_discipline)', '($1, $2)' , 
        data, response => callback(response));
    }
}

module.exports = DisciplineImportController;