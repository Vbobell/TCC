var CrudAdmin = require('../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
    }
    getDataAdmins(callback){
        var crudAdmin = new CrudAdmin();
        crudAdmin.executeSelect('admin', data =>{
            return callback(data);
        });
    }
    loginValidation(callback){
        var crudAdmin = new CrudAdmin();
        crudAdmin.selectUser('1','123456', (data) => {
            if(data.count == 1)
                return callback(true);
            else
                return callback(true);
        });
    }
}

module.exports = ManageAdmin;