const pool = require('../../lib/db');

class Crud {
    executeSelect(table, columns, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return json(JSON.stringify(err));
            }
            client.query("SELECT " + columns + " from " + table + ";", function (err, result) {
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
                client.query("insert into " + table + " " + columns + " values " + parameters, values[i], function (err, result) {
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
                client.query("update " + table + " set " + columns + " = " + values + " where " + parameters + ";", registry, function (err, result) {
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
            client.query("delete from "+ table + " where " + parameters + ";", registry, function (err, result) {
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
}

module.exports = Crud;