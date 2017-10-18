var ImportFile = require('../../../models/importFile/CSV/import');
var CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class ControllerAdmin {
    constructor(file) {
        this.file = file;
    }
    getDataAdmin(callback) {
        var importAdmin = new ImportFile(this.file, ',', 30);
        importAdmin.returnData(data =>
            this.insertDataAdmin(data, response =>
                callback(response)
            )
        );
    }
    insertDataAdmin(data, callback) {
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeInsert('admin','(name_admin, registre, user_level)', data, response => callback(response));
    }
}

module.exports = ControllerAdmin;