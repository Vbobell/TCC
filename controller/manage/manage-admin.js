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
    removeAdmin(data, callback){
        let crudAdmin = new CrudAdmin();
        let where = "registre='"+data.registre+"'";
        crudAdmin.executeDelete('admin', where, data =>{
            return callback(data);
        });
    }
    editAdmin(data, callback){
        let crudAdmin = new CrudAdmin();
        let values = "('" + data.name + ", '" + data.registre + "')";
        let where = "registre='"+data.registre+"'";
        console.log(values);
        console.log(where);
        crudAdmin.executeUpdate('admin', '(name_admin, registre)', values, where, data => {
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