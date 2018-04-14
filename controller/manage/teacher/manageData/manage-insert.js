const ManageActivity = require('../manageActivity/manage-activity');

class ManageInsert{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback){
        switch(this.entity){
            case 'activity':
                let manageActivity = new ManageActivity();
                manageActivity.insertDataActivity(this.parameters, data => {
                    return callback(data);
                });
            break;
        }
    }
}

module.exports = ManageInsert;