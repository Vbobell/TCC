const Crud = require('../generic-crud');

class CrudCourse extends Crud{
    selectCourses(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
                //client.query('SELECT id_course, name_course, description_course from course limit $1 offset $2;', [limit, offset] , function (err, result) {
                client.query('SELECT id_course, name_course, description_course from course;', function (err, result) {
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

module.exports = CrudCourse;