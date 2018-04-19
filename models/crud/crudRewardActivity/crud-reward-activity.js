const Crud = require('../generic-crud');

class CrudRewardActivity extends Crud{
    selectRewardActivity(ids, limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                /* client.query(`SELECT id_reward, name_reward, description_reward, file_reward, 
                enable_reward FROM reward ORDER BY name_reward ASC LIMIT $1 OFFSET $2;`, [limit, offset] , function (err, result) {
                */
               client.query(`SELECT id_reward, name_reward, description_reward, file_reward, 
               enable_reward FROM reward WHERE id_reward = ANY($1::int[]) AND enable_reward = true ORDER BY id_reward ASC`,[ids], function (err, result) {
                done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectRewardInActivity(idActivity, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
               client.query(`SELECT id_reward FROM activity_reward WHERE id_activity = $1`,[idActivity], function (err, result) {
                done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
}

module.exports = CrudRewardActivity;