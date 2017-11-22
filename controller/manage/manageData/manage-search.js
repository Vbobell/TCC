const ManageAdmin = require('../manageAdmin/manage-admin');

class ManageSearch{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(this.parametres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;