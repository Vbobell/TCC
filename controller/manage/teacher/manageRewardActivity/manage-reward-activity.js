const CrudRewardActivity = require('../../../../models/crud/crudRewardActivity/crud-reward-activity');

class ManageRewardActivity{
    constructor(){
        this.crudRewardActivity = new CrudRewardActivity();
    }
    insertDataReward(parameters, callback){
        let registers = [];

        parameters.config.rewards.forEach(reward => {
            let registry = [parameters.id, reward];
            registers.push(registry);
        });

        this.crudRewardActivity.executeInsert(
            'activity_reward', '(id_activity, id_reward)', '($1, $2)',
            registers, response => {
                return callback(response);
            });
    }
    getDataRewardActivity(parameters, callback){
        this.crudRewardActivity.selectRewardActivity(parameters.ids, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }

    getRewardInActivity(parameters, callback){
        this.crudRewardActivity.selectRewardInActivity(parameters.idActivity, (data) =>{
            return callback(data);
        });
    }

    removeRewardActivity(parameters, callback){
        this.crudRewardActivity.executeDelete(
        "activity_reward", "id_activity = $1", [parameters.idActivity],
        (response) => {
            return callback(response);
        });
    }
}

module.exports = ManageRewardActivity;
