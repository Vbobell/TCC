var Crud = require('../generic-crud');

class CrudAdmin extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query('SELECT count(*) from admin where registre = ? and password = ?', [user,password], function (err, result) {
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

module.exports = CrudAdmin;