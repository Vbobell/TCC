const CrudAdmin = require('../../../models/crud/crudAdmin/crud-admin');
const crypto = require('crypto');

class AdminImportController {
    constructor(data) {
        this.data = data;
    }
    getReadData(callback) {
        let newData = [];
        for(var i = 0; i < this.data.length; i++){
            newData.push(this.data[i].split(','));
        }
        this.data = newData;
        return callback(this.data);
    }
    insertDataAdmin(data, callback) {
        this.generatedPassword(data, (registry) => {
            let crudAdmin = new CrudAdmin();
            crudAdmin.executeInsert('admin','(name_admin, registry, email, password)', '($1, $2, $3, $4)' , data, 
            response => callback(response));
        });
    }
    generatedPassword(data, callback){
        data.forEach((registry, index) => {
            let hash = crypto.createHash('md5').update(registry[1]).digest('hex');
            data[index].push(hash);
        });
        return callback(data);
    }
}

module.exports = AdminImportController;