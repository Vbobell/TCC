const Crud = require('../generic-crud');

class CrudAdmin extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query('SELECT id_admin, name_admin, user_identity from admin where registry = $1 and password = $2;', [user,password] , function (err, result) {
                    done();
                    if (err) {
                        return json(false);
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
                client.query(`SELECT id_admin, name_admin, registry FROM admin WHERE registry <> '123' ORDER BY name_admin`, function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
                });
            });
        });
    }
    selectUserEdit(user, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query('SELECT registry, name_admin, user_identity, email FROM admin WHERE id_admin = $1', [user] , function (err, result) {
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

module.exports = CrudAdmin;