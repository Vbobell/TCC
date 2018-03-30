const ManageAdmin = require('../admin/manageAdmin/manage-admin');
const ManageTeacher = require('../admin/manageTeacher/manage-teacher');

class ManageLogin{
    constructor(user){
        this.user = user;
        this.manageAdmin = new ManageAdmin();
        this.manageTeacher = new ManageTeacher();
    }
    login(callback){
        this.manageAdmin.loginValidation(this.user, (valid) =>{
            if(valid){
                this.user.id = valid[0].id_admin;
                this.user.name = valid[0].name_admin;
                this.user.route = '/admin';
                this.user.type = 'admin';
                return callback(this.user);
            }
            this.manageTeacher.loginValidation(this.user, (valid) =>{
                if(valid){
                    this.user.id = valid[0].id_teacher;
                    this.user.name = valid[0].name_teacher;
                    this.user.route = '/teacher';
                    this.user.type = 'teacher';
                    return callback(this.user);
                }else{
                    return callback(false);
                }
            });
        });
        
    }
}

module.exports = ManageLogin;