//var ImportFile = require('../../../models/importFile/CSV/import');
var CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class AdminImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        var newData = [];
        for(var i = 0; i < this.data.length; i++){
            newData.push(this.data[i].split(','));
        }
        this.data = newData;
        return callback(this.data);
    }
    insertDataAdmin(data, callback) {
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registre)', '($1, $2)' , data, response => callback(response));
    }
}

module.exports = AdminImportController;