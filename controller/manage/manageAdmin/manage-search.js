const ManageAdmin = require('./manage-admin');

class ManageSearch{
    construtor(entity){
        this.entity = entity;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(request.query, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;