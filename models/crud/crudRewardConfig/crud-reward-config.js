const Crud = require('../generic-crud');

class CrudRewardConfig extends Crud{
    selectRewardsConfg(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                /* client.query(`SELECT id_reward_config, name_config, description_config, config, id_reward 
                    FROM reward_configuration ORDER BY id_reward_config ASC LIMIT $1 OFFSET $2;`, [limit, offset] , function (err, result) {
 */                client.query(`SELECT id_reward_config, name_config, description_config, config, id_reward 
                FROM reward_configuration ORDER BY id_reward_config ASC`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectRewardsEnable(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT reward.id_reward AS id, 
               reward.file_reward AS name
               FROM reward, reward_configuration 
               WHERE reward.enable_reward = true AND
               reward.id_reward  NOT IN(SELECT reward.id_reward
               FROM reward, reward_configuration 
               WHERE reward.id_reward = reward_configuration.id_reward) GROUP BY reward.id_reward`, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectRewardsEnableConfig(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT reward.id_reward AS id, 
                reward.file_reward AS name, 
                reward_configuration.config
                FROM reward, reward_configuration 
                WHERE reward.id_reward = reward_configuration.id_reward
                AND reward.enable_reward = true 
                ORDER BY id_reward_config ASC`, function (err, result) {
                    done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
}

module.exports = CrudRewardConfig;