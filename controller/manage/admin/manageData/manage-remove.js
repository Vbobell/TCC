const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');
const ManageTeacher = require('../manageTeacher/manage-teacher');

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
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.removeDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'teacher':
            let manageTeacher = new ManageTeacher();
            manageTeacher.removeTeacher(this.parametres, data => {
                return callback(data);
            });
            break;
        }
    }
}

module.exports = ManageRemove;