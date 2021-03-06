const Crud = require('../generic-crud');

class CrudReward extends Crud{
    selectRewards(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                /* client.query(`SELECT id_reward, name_reward, description_reward, file_reward, 
                enable_reward FROM reward ORDER BY name_reward ASC LIMIT $1 OFFSET $2;`, [limit, offset] , function (err, result) {
                */
               client.query(`SELECT id_reward, name_reward, description_reward, file_reward, 
               enable_reward FROM reward ORDER BY name_reward ASC`, function (err, result) {
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

module.exports = CrudReward;