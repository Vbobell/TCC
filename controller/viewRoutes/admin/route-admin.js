const ManageSearch = require('../../manage/admin/manageData/manage-search');
const ManageEdit = require('../../manage/admin/manageData/manage-edit');

class RouteAdmin{
    constructor(controller){
        this.controller = controller;
    }
    getRouteData(callback){
        switch(this.controller.type){
            case 'search':
            let manageSearch = new ManageSearch(this.controller.entity, this.controller.parameters);
            manageSearch.getData((data) => {
                return callback(data);
            });
            break;
            case 'edit':
            let manageEdit = new ManageEdit(this.controller.entity, this.controller.parameters);
            manageEdit.getEdit((data) => {
                return callback(data);
            });
            break;
            default:
                return callback(false);
            break;
        }
    }
}

module.exports = RouteAdmin;




