var CrudAdmin = require('../../models/crud/crudAdmin/crud-admin');

class manageAdmin{
    constructor(){

    }
    getDataAdmins(callback){
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeSelect('admin', data =>{
            return callback(data);
        });
    }
}