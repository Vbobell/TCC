const Crud = require('../generic-crud');

class CrudTeacher extends Crud{
    selectUsers(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query('SELECT id_teacher, name_teacher, registry from teacher limit $1 offset $2;', [limit, offset] , function (err, result) {
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

module.exports = CrudTeacher;