const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class AdminImportController {
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
    insertDataAdmin(data, callback) {
        let crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registry, email)', '($1, $2, $3)' , data, response => callback(response));
    }
}

module.exports = AdminImportController;