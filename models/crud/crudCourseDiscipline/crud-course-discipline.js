const Crud = require('../generic-crud');

class CrudCourseDiscipline extends Crud{
    selectCoursesAndDiscipline(limit, offset, json){
        this.getPool((data) =>{
            data.connect(function (err, client, done) {
                if (err) {
                    return json(JSON.stringify(err));
                }
/*                 client.query(`SELECT course.id_course, course.name_course, 
                            discipline.id_discipline, discipline.name_discipline 
                            from course, discipline, course_discipline 
                            where course_discipline.id_course = course.id_course and 
                            discipline.id_discipline = course_discipline.id_discipline 
                            limit $1 offset $2;`, [limit, offset] , function (err, result) { */
                    client.query(`SELECT course.id_course, course.name_course, 
                            discipline.id_discipline, discipline.name_discipline 
                            from course, discipline, course_discipline 
                            where course_discipline.id_course = course.id_course and 
                            discipline.id_discipline = course_discipline.id_discipline;`, function (err, result) {
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

module.exports = CrudCourseDiscipline;