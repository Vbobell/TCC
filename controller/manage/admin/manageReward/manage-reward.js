const CrudReward = require('../../../../models/crud/crudReward/crud-reward');

class ManageReward{
    constructor(){
        this.crudReward = new CrudReward();
    }
    getDataRewards(parameters, callback){
        this.crudReward.selectRewards(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    enableDisableReward(parameters, callback){
        let where = 'id_reward = $2';
        let registry = [parameters.enable, parameters.idReward];
        this.crudReward.executeUpdateSet('reward', 'SET enable_reward = $1', where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageReward;
