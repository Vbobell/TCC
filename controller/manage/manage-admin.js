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
            var valid = JSON.parse(data);
            console.log(valid);
            console.log(valid.count);
            console.log(valid.count == 1);
            if(valid.count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;