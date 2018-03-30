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
        let registry = [parameters.idAdmin];
        this.crudAdmin.executeDelete('admin', where, registry, data =>{
            return callback(data);
        });
    }
    editAdmin(parameters, callback){
        let values = '($1, $2)';
        let registry = [parameters.name, parameters.registry, parameters.idAdmin];
        let where = 'id_admin = $3';
        this.crudAdmin.executeUpdate('admin', '(name_admin, registry)', values, where, registry, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        this.crudAdmin.selectUser(parameters.user,parameters.password, data => {
            if(data.length == 0){
                return callback(false);
            }else{
                return callback(data);
            }
        });
    }
}

module.exports = ManageAdmin;