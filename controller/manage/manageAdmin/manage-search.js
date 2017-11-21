const ManageAdmin = require('./manage-admin');

class ManageSearch{
    construtor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getData(callback){
        console.log(this.entity);
        console.log(this.parametres);
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