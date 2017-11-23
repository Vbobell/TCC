const ManageAdmin = require('../manageAdmin/manage-admin');
const ManageCourse = require('../manageCourse/manage-course');

class ManageSearch{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getData(callback){
        switch(this.entity){
            case 'admin':
                let manageAdmin = new ManageAdmin();
                manageAdmin.getDataAdmins(this.parametres, data => {
                    return callback(data);
                });
            break;
            case 'course':
                let manageCourse = new ManageCourse();
                manageCourse.getDataCourses(this.parametres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageSearch;