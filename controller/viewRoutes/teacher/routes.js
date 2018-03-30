const ManageSearchTeacher = require('../../manage/teacher/manageData/manage-search');

class RouteTeacher{
    constructor(controller){
        this.controller = controller;
    }
    getRouteData(callback){
        switch(this.controller.type){
            case 'search':
            let manageSearchTeacher = new ManageSearchTeacher(this.controller.entity, this.controller.parameters);
            manageSearchTeacher.getData((data) => {
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