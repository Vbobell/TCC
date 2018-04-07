const CrudRewardActivity = require('../../../../models/crud/crudRewardActivity/crud-reward-activty');

class ManageRewardActivity{
    constructor(){
        this.crudRewardActivity = new CrudRewardActivity();
    }
    getDataRewardActivity(parameters, callback){
        this.crudRewardActivity.selectRewardActivity(parameters.ids, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageRewardActivity;
