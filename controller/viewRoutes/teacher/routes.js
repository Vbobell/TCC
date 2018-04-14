const ManageSearch = require('../../manage/teacher/manageData/manage-search');
const ManageInsert = require('../../manage/teacher/manageData/manage-insert');

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
            default:
                return callback(false);
            break;
        }
    }
}

module.exports = RouteTeacher;