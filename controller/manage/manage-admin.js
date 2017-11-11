const CrudAdmin = require('../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
    }
    getDataAdmins(callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.executeSelect('admin', '(name_admin, registre)',data =>{
            return callback(data);
        });
    }
    loginValidation(query, callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.selectUser(query.user,query.password, data => {
            if(JSON.parse(data)[0].count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;