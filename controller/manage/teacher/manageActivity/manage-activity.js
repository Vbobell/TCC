const CrudActivity = require('../../../../models/crud/crudActivity/crud-activity');

class ManageActivity{
    constructor(){
        this.crudActivity = new CrudActivity();
        this.data = ''; 
    }

    insertDataActivity(parameters, callback){
        let registry = [
            parameters.config.nameActivity,
            parameters.config.descriptionActivity,
            parameters.config.pointActivity,
            parameters.config.idDiscipline,
            parameters.config.idTeacher
        ] 

        this.crudActivity.executeUniqueInsert(
            'activity', 
            '(name_activity, description_activity, point_activity, id_discipline, id_teacher)',
            '($1, $2, $3, $4, $5)',
            'id_activity',
            registry,
            response => {
                callback(response);
            });
    }

    updateDataActivity(parameters, callback){
        let registry = [
            parameters.config.nameActivity,
            parameters.config.descriptionActivity,
            parameters.config.pointActivity,
            parameters.config.idDiscipline,
            parameters.config.idTeacher,
            parameters.id
        ];

        let where = 'id_activity = $6';

        this.crudActivity.executeUpdate(
            'activity', 
            '(name_activity, description_activity, point_activity, id_discipline, id_teacher)',
            '($1, $2, $3, $4, $5)',
            where,
            registry,
            response => {
                callback(response);
            });
    }
}

module.exports = ManageActivity;