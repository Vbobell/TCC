const Crud = require('../generic-crud');

class CrudUserPoints extends Crud{
    selectUserPoint(parameters, registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT 
               points
               FROM ${parameters.table}
               WHERE
               ${parameters.columnUser} = $1
               AND
               id_discipline = $2`, registry, function (err, result) {
                done();
                    if (err) {
                        return json(false);
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectAllPointsUser(parameters, registry, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
               client.query(`SELECT 
               points, id_discipline
               FROM ${parameters.table} 
               WHERE ${parameters.columnUser} = $1`, [registry], function (err, result) {
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

module.exports = CrudUserPoints;