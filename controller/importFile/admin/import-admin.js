const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');
const crypto = require('crypto');

class AdminImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        let newData = [];
        for(var i = 0; i < this.data.length; i++){
            if(this.data[i].length > 0){
                newData.push(this.data[i].split(','));
            }
        }
        this.data = newData;
        return callback(this.data);
    }
    insertDataAdmin(data, callback) {
        this.generatedPassword(data, (registry) => {
            let crudAdmin = new CrudAdmin();
            crudAdmin.executeInsert('admin','(name_admin, registry, email, password)', '($1, $2, $3, $4)' , registry, response => {
                callback(response);
            });
        });
    }
    generatedPassword(data, callback){
        for(var i = 0; i < data.length; i++){
            let hash = crypto.createHash('md5').update(String(data[i][1])).digest('hex');
            data[i].push(hash);
        }
        return callback(data);
    }
}

module.exports = AdminImportController;