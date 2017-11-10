const CrudAdmin = require('../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
    }
    getDataAdmins(callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.executeSelect('admin', data =>{
            return callback(data);
        });
    }
    loginValidation(query, callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.selectUser(query.user,query.password, data => {
            let valid = JSON.parse(data);
            console.log(valid[0].count);
            if(valid[0].count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;