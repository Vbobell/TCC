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
    editRewardConfig(parameters, callback){
        let registry = [parameters.config, parameters.idConfig];
        let where = 'id_reward_config = $2';
        this.crudRewardConfig.executeUpdateSet('reward_configuration', 'config = $1', where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageRewardConfig;