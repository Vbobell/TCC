const Crud = require('../generic-crud');

class CrudAdmin extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                client.query('SELECT id_admin, name_admin from admin where registry = $1 and password = $2;', [user,password] , function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(result.rows);
                });
            });
        });
    }
    selectUsers(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                //client.query('SELECT id_admin,name_admin, registry from admin limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_admin, name_admin, registry from admin', function (err, result) {
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

module.exports = CrudAdmin;