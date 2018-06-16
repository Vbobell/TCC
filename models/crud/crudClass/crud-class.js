const Crud = require('../generic-crud');

class CrudClass extends Crud{
    selectClass(json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                client.query('SELECT id_class, name_class FROM class_ ORDER BY name_class', function (err, result) {
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

module.exports = CrudClass;