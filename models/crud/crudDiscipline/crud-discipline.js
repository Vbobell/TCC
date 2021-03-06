const Crud = require('../generic-crud');

class CrudDiscipline extends Crud{
    selectDisciplines(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                //client.query('SELECT id_discipline, name_discipline, description_discipline from discipline limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_discipline, name_discipline, description_discipline from discipline;', function (err, result) {
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

module.exports = CrudDiscipline;