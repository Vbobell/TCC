const CrudActivity = require('../../../../models/crud/crudActivity/crud-activity');

class ManageActivity {
    constructor() {
        this.crudActivity = new CrudActivity();
        this.data = '';
    }
    getDataActivity(parameters, callback) {
        let registry = [
            parameters.idActivity,
            parameters.idTeacher
        ]

        this.crudActivity.selectActivityObject(
            registry,
            (data) => {
                return callback(data);
            }
        );
    }

    getRealizeActivity(parameters, callback) {
        let registry = [
            parameters.idActivity
        ]

        this.crudActivity.selectActivity(
            registry,
            (data) => {
                return callback(data);
            }
        );
    }

    insertDataActivity(parameters, callback) {
        let registry = [
            parameters.config.nameActivity,
            parameters.config.descriptionActivity,
            parameters.config.pointActivity,
            parameters.config.idDiscipline,
            parameters.config.idTeacher,
            parameters.config.idClass
        ]

        this.crudActivity.executeUniqueInsert(
            'activity',
            '(name_activity, description_activity, point_activity, id_discipline, id_teacher, id_class)',
            '($1, $2, $3, $4, $5, $6)',
            'id_activity',
            registry,
            response => {
                return callback(response);
            });
    }

    updateDataActivity(parameters, callback) {
        let registry = [
            parameters.config.nameActivity,
            parameters.config.descriptionActivity,
            parameters.config.pointActivity,
            parameters.config.idDiscipline,
            parameters.config.idTeacher,
            parameters.config.idClass,
            parameters.id
        ];

        let where = 'id_activity = $7';

        this.crudActivity.executeUpdate(
            'activity',
            '(name_activity, description_activity, point_activity, id_discipline, id_teacher, id_class)',
            '($1, $2, $3, $4, $5, $6)',
            where,
            registry,
            response => {
                return callback(response);
            });
    }

    removeDataActivity(parameters, callback) {
        this.crudActivity.executeDelete(
            "student_activity", "id_activity = $1", [parameters.idActivity],
            (response) => {
                this.crudActivity.executeDelete(
                    "activity", "id_activity = $1", [parameters.idActivity],
                    (response) => {
                        return callback(response);
                    });
            });
    }
}

module.exports = ManageActivity;