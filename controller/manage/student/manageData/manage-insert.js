const ManageStudentActivity = require('../manageStudentActivity/manage-student-activity');

class ManageInsert{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getInsert(callback){
        switch(this.entity){
            case 'studentActivity':
                let manageStudentActivity = new ManageStudentActivity();
                let that = this;

                manageStudentActivity.checkQuestions(this.parameters.activity, corrects =>{
                    let pointQuestion = this.parameters.activity.points / this.parameters.activity.questions.length;
                    this.parameters.activity.points = corrects.length * pointQuestion;

                    manageStudentActivity.insertDataActivity(that.parameters, activity => {
                        manageStudentActivity.insertQuestions(that.parameters, result => {
                            return callback(result);
                        });
                    });
                });
            break;
            default:
            return callback(false);
            break;
        }
    }
}

module.exports = ManageInsert;