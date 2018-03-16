const Crud = require('../generic-crud');

class CrudReward extends Crud{
    selectRewards(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(`SELECT id_reward, name_reward, description_reward, file_reward, 
                enable_reward FROM reward ORDER BY name_reward ASC LIMIT $1 OFFSET $2;`, [limit, offset] , function (err, result) {
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

module.exports = CrudReward;