const Crud = require('../generic-crud');

class CrudRewardConfig extends Crud{
    selectRewardsConfg(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(`SELECT id_reward_config, name_config, description_config, config, id_reward 
                    FROM reward_configuration ORDER BY id_reward ASC LIMIT $1 OFFSET $2;`, [limit, offset] , function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
}

module.exports = CrudRewardConfig;