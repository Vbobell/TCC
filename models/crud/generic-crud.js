const pool = require('../../lib/db');

class Crud {
    executeSelect(table, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * from ' + table, function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                return json(JSON.stringify(result.rows));
            });
        });
    }
    executeInsert(table, columns, values, json) {
        pool.connect(function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            for(var i = 0; i < values.length; i++){
                client.query('insert into ' + table + ' ' + columns + ' values ($1, $2, $3) ', values[i], function (err, result) {
                    done();
                    if (err) {
                        return console.error('error running query', err);
                    }
                    return json(result.affectedRows);
                });
            }
        });
    }
}

module.exports = Crud;