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
        let where = 'id_admin= $1';
        let registre = parametres.idAdmin;
        this.crudAdmin.executeDelete('admin', where, registre, data =>{
            return callback(data);
        });
    }
    editAdmin(parametres, callback){
        let values = '($1, $2)';
        let registre = [parametres.name, parametres.registre, parametres.idAdmin];
        let where = 'id_admin = $3';
        this.crudAdmin.executeUpdate('admin', '(name_admin, registre)', values, where, registre, data => {
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