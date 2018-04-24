const CrudAdmin = require('../../../../models/crud/crudAdmin/crud-admin');
const crypto = require('crypto');

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
    editAdminUser(parameters, callback){
        let values = '($1, $2, $3, $4)';
        let password = crypto.createHash('md5').update(String(parameters.newPassword)).digest('hex');
        let registry = [parameters.nameUser, parameters.email, password, parameters.avatar, parameters.registry];
        let where = 'registry = $5';
        this.crudAdmin.executeUpdate('admin', '(name_admin, email, password, user_identity)', values, where, registry, data => {
            return callback(data);
        });
    }
    loginValidation(parameters, callback){
        let hash = crypto.createHash('md5').update(parameters.password).digest('hex');
        this.crudAdmin.selectUser(parameters.user, hash, data => {
            if(!data || data.length == 0){
                return callback(false);
            }else{
                return callback(data);
            }
        });
    }
    getDataAdminEdit(parameters, callback){
        this.crudAdmin.selectUserEdit(parameters.idAdmin, data =>{
            return callback(data);
        });
    }
}

module.exports = ManageAdmin;