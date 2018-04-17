const pool = require('../../lib/db');

class Crud {
    executeSelect(table, columns, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return json(JSON.stringify(err));
            }
            client.query(`SELECT ${columns} FROM ${table}`, function (err, result) {
                done();
                if (err) {
                    return json(JSON.stringify(err));
                }
                return json(JSON.stringify(result.rows));
            });
        });
    }
    executeInsert(table, columns, parameters, values, json) {
        var affectedRows = [];
        pool.connect(function (err, client, done) {
            if (err) {
                return json(JSON.stringify(err));
            }
            
            for(var i = 0; i < values.length; i++){
                client.query(`INSERT INTO ${table} ${columns} VALUES  ${parameters}`, values[i], function (err, result) {
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    affectedRows.push(result.rowCount);
                });
            }
            done();
            return json(affectedRows);
        });
    }
    executeUpdate(table, columns, values, parameters, registry, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return json(JSON.stringify(err));
            }
                client.query(`UPDATE ${table} SET ${columns}  = ${values} WHERE ${parameters}`, registry, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rowCount);
                });
        });
    }
    executeDelete(table, parameters, registry, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return json(JSON.stringify(err));
            }
            client.query(`DELETE FROM ${table} WHERE ${parameters}`, registry, function (err, result) {
                done();
                if (err) {
                    return json(JSON.stringify(err));
                }
                return json(result.rowCount);
            });            
        });
    }
    getPool(callback){
        return callback(pool);
    }
    executeUniqueInsert(table, columns, parameters, id, values, json) {
        var affectedRows = [];
        pool.connect(function (err, client, done) {
            if (err) {
                return json(false);
            }
            client.query(`INSERT INTO ${table} ${columns} VALUES ${parameters} RETURNING ${id}`, values, function (err, result) {
                done();
                if (err) {
                    return json(false);
                }
                json(result.rows);
            });
        });
    }
}

module.exports = Crud;