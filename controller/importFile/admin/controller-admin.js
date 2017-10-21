var ImportFile = require('../../../models/importFile/CSV/import');
var CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class AdminImportController {
    constructor(file) {
        this.file = file;
    }
    getReadData(callback) {
        var importAdmin = new ImportFile(this.file, ',', 30);
        importAdmin.returnData(data => callback(data));
    }
    insertDataAdmin(data, callback) {
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registre, user_level)', '($1, $2, $3)' , data, response => callback(response));
    }
}

module.exports = AdminImportController;