const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');

class ManageRemove{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getRemove(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.removeAdmin(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.removeCourse(this.parametres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageRemove;