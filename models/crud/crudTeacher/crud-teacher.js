const Crud = require('../generic-crud');

class CrudTeacher extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query('SELECT id_teacher, name_teacher, user_identity from teacher where registry = $1 and password = $2;', [user,password] , function (err, result) {
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
                    return json(false);
                }
                //client.query('SELECT id_teacher, name_teacher, registry from teacher limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_teacher, name_teacher, registry FROM teacher ORDER BY name_teacher', function (err, result) {
                    done();
                    if (err) {
                        return json(false);
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
                client.query('SELECT registry, name_teacher, user_identity, email FROM teacher WHERE id_teacher = $1', [user] , function (err, result) {
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

module.exports = CrudTeacher;