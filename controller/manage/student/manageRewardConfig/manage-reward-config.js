const CrudRewardConfig = require('../../../../models/crud/crudRewardConfig/crud-reward-config');

class ManageRewardConfig{
    constructor(){
        this.crudRewardConfig = new CrudRewardConfig();
    }

    getRewardNotConfigEnable(callback){
        this.crudRewardConfig.selectRewardsEnable(data => {
            return callback(data);
        });
    }

    getRewardConfigEnable(callback){
        this.crudRewardConfig.selectRewardsEnableConfig(data => {
            return callback(data);
        });
    }
}

module.exports = ManageRewardConfig;