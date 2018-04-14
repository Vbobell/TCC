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
        let registers = [];
        registers.push(registry);

        this.crudActivity.executeInsert(
            'activity', 
            '(name_activity, description_activity, point_activity, id_discipline, id_teacher)',
            '($1, $2, $3, $4, $5)',
            registers,
            response => {
                callback(response);
            });
    }
}

module.exports = ManageActivity;