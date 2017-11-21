const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
        this.crudAdmin = new CrudAdmin();
    }
    getDataAdmins(parametres, callback){
        this.crudAdmin.selectUsers(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeAdmin(parametres, callback){
        let where = "id_admin='"+parametres.idAdmin+"'";
        this.crudAdmin.executeDelete('admin', where, data =>{
            return callback(data);
        });
    }
    editAdmin(parametres, callback){
        let values = "('" + parametres.name + "', '" + parametres.registre + "')";
        let where = "id_admin='"+parametres.idAdmin+"'";
        this.crudAdmin.executeUpdate('admin', '(name_admin, registre)', values, where, data => {
            return callback(data);
        });
    }
    loginValidation(parametres, callback){
        this.crudAdmin.selectUser(parametres.user,parametres.password, data => {
            if(JSON.parse(data)[0].count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;