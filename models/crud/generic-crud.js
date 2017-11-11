const pool = require('../../lib/db');

class Crud {
    executeSelect(table, columns, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query("SELECT " + columns + " from " + table + ";", function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                return json(JSON.stringify(result.rows));
            });
        });
    }
    executeInsert(table, columns, parametres, values, json) {
        var affectedRows = [];
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            for(var i = 0; i < values.length; i++){
                client.query("insert into " + table + " " + columns + " values " + parametres + " ", values[i], function (err, result) {
                    if (err) {
                        return console.error('error running query', err);
                    }
                    affectedRows.push(result.rowCount);
                });
            }
            done();
            return json(affectedRows);
        });
    }
    executeUpdate(table, columns, values, parametres, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
                client.query("update " + table + " set " + columns + " = " + values + " where " + parametres + ";", function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
                    }
                    console.log(result);
                    return json(result.rowCount);
                });
        });
    }
    executeDelete(table, parametres, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
                client.query("delete from "+ table + " where " + parametres + ";", function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
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