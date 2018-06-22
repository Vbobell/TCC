const CrudUserPoints = require('../../../../models/crud/crudUserPoints/crud-user-points');
const CrudTypeTopic = require('../../../../models/crud/crudTypeTopic/type-topic');
const ManageStudentDiscipline = require('../manageStudentDiscipline/manage-student-discipline');

class ManageStudentLevel {
    constructor() {
        this.crudUserPoints = new CrudUserPoints();
        this.crudTypeTopic = new CrudTypeTopic();
    }

    getLevelStudent(parameters, callback) {
        let disciplineLevels = [];

        this.averagePointTypeTopic((averageTypeTopic) => {

            this.getPointStudent(parameters.idUser, (pointsDiscipline) => {

                let manageStudentDiscipline = new ManageStudentDiscipline();
                let paramCheck = {
                    'averageTypeTopic': averageTypeTopic
                };

                manageStudentDiscipline.getDataStudentDiscipline(parameters, (disciplines) => {
                    for (let i = 0; i < disciplines.length; i++) {
                        disciplineLevels.push({
                            'discipline': disciplines[i].id_discipline,
                            'level': 1,
                            'points': 0,
                            'averageTypeTopic': averageTypeTopic
                        });

                        if (pointsDiscipline.length == 0) {
                            if (i == disciplines.length - 1) {
                                return callback(disciplineLevels);
                            }
                        } else {
                            for (let j = 0; j < pointsDiscipline.length; j++) {
                                if (disciplines[i].id_discipline == pointsDiscipline[j].id_discipline) {
                                    paramCheck.point = pointsDiscipline[j].points;

                                    this.checkLevel(paramCheck, (level) => {
                                        disciplineLevels[disciplineLevels.length - 1].level = level;
                                        disciplineLevels[disciplineLevels.length - 1].points = pointsDiscipline[j].points;

                                        if (i == disciplines.length - 1) {
                                            return callback(disciplineLevels);
                                        }
                                    });
                                    break;
                                } else {
                                    if (i == disciplines.length - 1 && j == pointsDiscipline.length - 1) {
                                        return callback(disciplineLevels);
                                    }
                                }
                            }
                        }
                    }
                });
            });
        });
    }

    checkLevel(parameters, callback) {
        let count = 1;
        let level = 0;

        do {
            level++;
            count++;
        }
        while (parameters.point >= (count * parameters.averageTypeTopic));

        return callback(level);
    }

    averagePointTypeTopic(callback) {
        this.crudTypeTopic.selectTypeTopic((dataTypeTopics) => {
            let typeTopics = JSON.parse(dataTypeTopics);
            let result = 0;

            for (let typeTopic of typeTopics) {
                result += typeTopic.point_type_topic;
            }

            result = result / typeTopics.length;

            return (callback(result));
        });
    }

    getPointStudent(registry, callback) {
        let parameters = {
            table: 'student_points',
            columnUser: 'id_student'
        };

        this.crudUserPoints.selectAllPointsUser(parameters, registry, (data) => {
            return callback(data);
        });
    }
}

module.exports = ManageStudentLevel;

