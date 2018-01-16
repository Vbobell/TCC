const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');
const ManageDiscipline = require('../manageDiscipline/manage-discipline');

class ManageEdit{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getEdit(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.editAdmin(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.editCourse(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'discipline':
                let manageDiscipline = new ManageDiscipline();
                manageDiscipline.editDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;                
        }
    }
}

module.exports = ManageEdit;