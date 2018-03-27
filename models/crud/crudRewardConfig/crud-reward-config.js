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
}

module.exports = CrudRewardConfig;