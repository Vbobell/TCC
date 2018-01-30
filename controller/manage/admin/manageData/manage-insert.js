const ManageCourseDiscipline = require('../manageCourseDiscipline/manage-course-discipline');

class ManageInsert{
    constructor(entity, parametres){
        this.entity = entity;
        this.parametres = parametres;
    }
    getInsert(callback){
        switch(this.entity){
            case 'course_discipline':
                let manageCourseDiscipline = new ManageCourseDiscipline();
                manageCourseDiscipline.insertDataCourseDiscipline(this.parametres, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageInsert;