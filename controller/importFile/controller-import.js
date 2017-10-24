var AdminImportController = require('./admin/controller-admin');

class ControllerImport{
    constructor(route, data){
        this.route = route;
        this.data = data;
    }
    csvInsertData(callback){
        switch(this.route){
            case 'admin':
                var controllerAdm = new AdminImportController(this.data);
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