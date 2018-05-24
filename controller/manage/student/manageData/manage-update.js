const ManageStudent = require('../../admin/manageStudent/manage-student');

class ManageUpdate{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getUpdate(callback){
        switch(this.entity){
            case 'editStudentUser':
                let manageStudent = new ManageStudent();
                manageStudent.editStudantUser(this.parameters, data => {
                    return callback(data);
                });
            break;
            default:
                return callback("error");
            break;  
        }
    }
}

module.exports = ManageUpdate;