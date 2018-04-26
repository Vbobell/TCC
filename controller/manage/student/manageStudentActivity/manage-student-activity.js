const CrudStudentActivity = require('../../../../models/crud/crudStudentActivity/crud-student-activity');
const ManageAlternativeQuestion = require('../../teacher/manageAlternativeQuestion/manage-alternative-question');

class ManageStudentActivity{
    constructor(){
        this.crudStudentActivity = new CrudStudentActivity();
        this.data = ''; 
    }

    insertDataActivity(corrects, parameters, callback){
        let pointQuestion = parameters.activity.points / parameters.activity.questions.length;
        parameters.activity.points = corrects.length * pointQuestion;

        let registry = [
            parameters.idStudent,
            parameters.activity.id,
            parameters.activity.points
        ] 

        this.crudStudentActivity.executeUniqueInsert(
            'student_activity', 
            '(id_student, id_activity, point_rechead)',
            '($1, $2, $3)',
            'id_student_activity',
            registry,
            response => {
                return callback(response);
            });
    }

    checkQuestions(parameters, callback){
        let manageAlternativeQuestion = new ManageAlternativeQuestion();
        let questionsCorrect = [];
        let count = 0;

        parameters.questions.forEach((question, index) => {
            manageAlternativeQuestion.getAlternativeQuestionCorrect(question, correct => {
                if(correct){
                    questionsCorrect.push({'questionId':question.id});
                }
                if(count == (parameters.questions.length-1)){
                    return callback(questionsCorrect);
                }
                count++;
            });
        });
    }

    insertQuestions(parameters, callback){
        let registers = [];

        parameters.activity.questions.forEach((question, index) => {
                let registry = [
                    parameters.activity.id,
                    question.id,
                    JSON.stringify(question.alternatives)
                ];

                registers.push(registry);
        });

        this.crudStudentActivity.executeInsert(
            'student_question_answer', 
            '(id_activity, id_question, answer)',
            '($1, $2, $3)',
            registers,
            response => {
                return callback(response);
            });
    }
}

module.exports = ManageStudentActivity;

