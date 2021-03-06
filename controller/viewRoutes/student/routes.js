const ManageSearch = require('../../manage/student/manageData/manage-search');
const ManageInsert = require('../../manage/student/manageData/manage-insert');
const ManageUpdate = require('../../manage/student/manageData/manage-update');

class RouteStudent{
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
            case 'insert':
            let manageInsert = new ManageInsert(this.controller.entity, this.controller.parameters);
            manageInsert.getInsert((data) => {
                return callback(data);
            });
            break;
            case 'update':
            let manageUpdate = new ManageUpdate(this.controller.entity, this.controller.parameters);
            manageUpdate.getUpdate((data) => {
                return callback(data);
            });
            break;
            default:
                return callback(false);
            break;
        }
    }
}

module.exports = RouteStudent;