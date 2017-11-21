const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
    }
    getDataAdmins(parametres, callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.selectUsers(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeAdmin(parametres, callback){
        let crudAdmin = new CrudAdmin();
        let where = "id_admin='"+parametres.idAdmin+"'";
        crudAdmin.executeDelete('admin', where, data =>{
            return callback(data);
        });
    }
    editAdmin(parametres, callback){
        let crudAdmin = new CrudAdmin();
        let values = "('" + parametres.name + "', '" + parametres.registre + "')";
        let where = "id_admin='"+parametres.idAdmin+"'";
        crudAdmin.executeUpdate('admin', '(name_admin, registre)', values, where, data => {
            return callback(data);
        });
    }
    loginValidation(parametres, callback){
        let crudAdmin = new CrudAdmin();
        crudAdmin.selectUser(parametres.user,parametres.password, data => {
            if(JSON.parse(data)[0].count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;