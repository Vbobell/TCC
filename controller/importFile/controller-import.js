var AdminImportController = require('./admin/controller-admin');

class ControllerImport{
    constructor(route, file){
        this.route = route;
        this.file = file;
    }
    csvInsertData(callback){
        switch(this.route){
            case 'admin':
                var controllerAdm = new AdminImportController(this.file);
                controllerAdm.getReadData(data => 
                    controllerAdm.insertDataAdmin(data, response => callback(response)));
            break;
            default:
                console.log('error');
            break;
        }
    }
}

module.exports = ControllerImport;