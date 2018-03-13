const CrudAdmin = require('../../../../models/crud/crudAdmin/crud-admin');

class ManageAdmin{
    constructor(){
        this.crudAdmin = new CrudAdmin();
    }
    getDataAdmins(parameters, callback){
        this.crudAdmin.selectUsers(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    removeAdmin(parameters, callback){
        let where = 'id_admin = $1';
        let registre = [parameters.idAdmin];
        this.crudAdmin.executeDelete('admin', where, registre, data =>{
            return callback(data);
        });
    }
    editAdmin(parameters, callback){
        let values = '($1, $2)';
        let registre = [parameters.name, parameters.registre, parameters.idAdmin];
        let where = 'id_admin = $3';
        this.crudAdmin.executeUpdate('admin', '(name_admin, registre)', values, where, registre, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        this.crudAdmin.selectUser(parameters.user,parameters.password, data => {
            if(JSON.parse(data)[0].count == 1)
                return callback(true);
            else
                return callback(false);
        });
    }
}

module.exports = ManageAdmin;