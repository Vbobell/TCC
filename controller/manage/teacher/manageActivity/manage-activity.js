const CrudActivity = require('../../../../models/crud/crudActivity/crud-activity');

class ManageActivity{
    constructor(){
        this.crudActivity = new CrudActivity();
        this.data = ''; 
    }
}

module.exports = ManageActivity;