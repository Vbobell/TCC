const Crud = require('../generic-crud');

class CrudTeacher extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                client.query('SELECT count(*) from teacher where registry = $1 and password = $2;', [user,password] , function (err, result) {
                    done();
                    if (err) {
                        return json(JSON.stringify(err));
                    }
                    return json(JSON.stringify(result.rows));
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
                //client.query('SELECT id_teacher, name_teacher, registry from teacher limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_teacher, name_teacher, registry from teacher', function (err, result) {
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

module.exports = CrudTeacher;