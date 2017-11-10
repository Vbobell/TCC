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
    loginValidation(query, callback){
        var crudAdmin = new CrudAdmin();
        crudAdmin.selectUser(query.user,query.password, data => {
            console.log(data);
            if(data[0] == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;