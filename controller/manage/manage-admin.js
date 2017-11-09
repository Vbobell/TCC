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
    loginValidation(){
        var crudAdmin = new CrudAdmin();
        crudAdmin.selectUser('1','123456', (data) => {
            console.log(data);
            if(data > 0)
                return true;
            else
                return false;
        });
    }
}

module.exports = ManageAdmin;