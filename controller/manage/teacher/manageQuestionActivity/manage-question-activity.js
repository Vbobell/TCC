const CrudQuestionActivity = require('../../../../models/crud/crudQuestionActivity/crud-question-activity');

class ManageQuestionActivity {
    constructor() {
        this.crudQuestionActivity = new CrudQuestionActivity();
        this.data = '';
    }
    insertDataQuestion(parameters, idActivity, callback) {
        let registry = [
            parameters.type,
            parameters.description,
            idActivity
        ]

        this.crudQuestionActivity.executeUniqueInsert(
            'activity_question',
            '(type_question, description_question, id_activity)',
            '($1, $2, $3)',
            'id_question',
            registry,
            response => {
                return callback(response);
            });
    }

    removeDataQuestions(idActivity, callback) {
        let where = "id_activity = $1";


        this.crudQuestionActivity.executeDelete(
            'student_question_answer',
            where,
            [idActivity],
            (response) => {
                this.crudQuestionActivity.executeDelete(
                    'activity_question',
                    where,
                    [idActivity],
                    response => {
                        return callback(response);
                    }
                );
            });
    }

    getQuestionActivityIds(idActivity, callback) {
        this.crudQuestionActivity.selectQuestionActivityIds(idActivity, data => {
            let ids = [];

            data.forEach((question, index) => {
                ids.push(question.id_question);
                if (index == data.length - 1) {
                    return callback(ids);
                }
            });
        });
    }

    getQuestionObject(idActivity, callback) {
        this.crudQuestionActivity.selectQuestionObject(idActivity, objectQuestion => {
            return callback(objectQuestion);
        });
    }
}

module.exports = ManageQuestionActivity;