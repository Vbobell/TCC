const ManageSearch = require('../../manage/teacher/manageData/manage-search');
const ManageInsert = require('../../manage/teacher/manageData/manage-insert');
const ManageUpdate = require('../../manage/teacher/manageData/manage-update');

class RouteTeacher{
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

module.exports = RouteTeacher;