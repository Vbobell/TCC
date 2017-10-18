var importFile = require('../../../models/importFile/CSV/import');

class ControllerAdmin{
    constructor(file){
        this.file = file;
    }
    getDataAdmin(){
        var test = new importFile(this.file, ',', 30);
        test.returnData(data => this.insertDataAdmin(data));
    }
    insertDataAdmin(data){
        console.log(data);
    }
}

module.exports = ControllerAdmin;