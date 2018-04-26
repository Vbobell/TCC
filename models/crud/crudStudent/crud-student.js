const Crud = require('../generic-crud');

class CrudStudent extends Crud{
    selectUser(user, password, json){
        this.getPool((data) =>{ 
            data.connect(function (err, client, done) {
                if (err) {
                    return json(false);
                }
                client.query('SELECT id_student, name_student, user_identity FROM student WHERE registry = $1 AND password = $2;', [user,password] , function (err, result) {
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
                //client.query('SELECT id_student, name_student, registry, email from student limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_student, name_student, registry, email FROM student  ORDER BY name_student', function (err, result) {
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
                client.query('SELECT registry, name_student, user_identity, email FROM student WHERE id_student = $1', [user] , function (err, result) {
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

module.exports = CrudStudent;