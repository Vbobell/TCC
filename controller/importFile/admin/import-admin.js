const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class AdminImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        let newData = [];
        console.log(this.data);
        for(var i = 0; i < this.data.length; i++){
            newData.push(this.data[i].split(','));
        }
        this.data = newData;
        console.log(this.data);
        return callback(this.data);
    }
    insertDataAdmin(data, callback) {
        let crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registre)', '($1, $2)' , data, response => callback(response));
    }
}

module.exports = AdminImportController;