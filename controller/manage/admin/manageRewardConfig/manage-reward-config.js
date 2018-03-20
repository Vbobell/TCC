const CrudRewardConfig = require('../../../../models/crud/crudRewardConfig/crud-reward-config');

class ManageRewardConfig{
    constructor(){
        this.crudRewardConfig = new CrudRewardConfig();
    }
    getDataRewardsConfig(parameters, callback){
        this.crudRewardConfig.selectRewardsConfg(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageRewardConfig;