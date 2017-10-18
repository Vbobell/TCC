var ImportFile = require('../../../models/importFile/CSV/import');
var CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class ControllerAdmin{
    constructor(file){
        this.file = file;
    }
    getDataAdmin(){
        var importAdmin = new ImportFile(this.file, ',', 30);
        importAdmin.returnData(data => this.insertDataAdmin(data));
    }
    insertDataAdmin(data){
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeSelect('admin', data => console.log(data));
    }
}

module.exports = ControllerAdmin;