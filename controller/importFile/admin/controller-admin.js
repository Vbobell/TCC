//var ImportFile = require('../../../models/importFile/CSV/import');
var CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class AdminImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        return callback(this.data);
    }
    insertDataAdmin(data, callback) {
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registre, user_level)', '($1, $2, $3)' , data, response => callback(response));
    }
}

module.exports = AdminImportController;