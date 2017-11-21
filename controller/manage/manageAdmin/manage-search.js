const ManageAdmin = require('./manage-admin');

class ManageSearch{
    construtor(entity, paramentres){
        this.entity = entity;
        this.paramentres = paramentres;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(this.paramentres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;