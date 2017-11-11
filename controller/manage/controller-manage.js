const ManageAdmin = require('./manage-admin');

class ControllerManage{
    constructor(route){
        this.route = route;
    }
    getData(callback){
        switch(this.route){
            case 'admin':
                let manage = new ManageAdmin();
                manage.getDataAdmins(data =>{
                    return callback(data);
                });
                break;
            default:
                return (callback('error'));
                break;
            }
    }
}

module.exports = ControllerManage;
