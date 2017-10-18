var ControllerAdmin = require('./admin/controller-admin');

class ControllerImport{
    constructor(route, file){
        this.route = route;
        this.file = file;
    }
    controllerRedirect(){
        switch(this.route){
            case 'admin':
                var controllerAdm = new ControllerAdmin(this.file);
                controllerAdm.getDataAdmin();
            break;
            default:
                console.log('error');
            break;
        }
    }
}

module.exports = ControllerImport;