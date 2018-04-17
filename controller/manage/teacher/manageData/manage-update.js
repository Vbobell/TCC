const ManageActivity = require('../manageActivity/manage-activity');
const ManageQuestionActivity = require('../manageQuestionActivity/manage-question-activity');
const ManageAlternativeQuestion = require('../manageAlternativeQuestion/ManageAlternativeQuestion');

class ManageUpdate{
    constructor(entity, parameters){
        this.entity = entity;
        this.parameters = parameters;
    }
    getUpdate(callback){
        switch(this.entity){
            case 'activity':
                let manageActivity = new ManageActivity();
                let manageQuestionActivity = new ManageQuestionActivity();
                let manageAlternativeQuestion = new ManageAlternativeQuestion();
                let that = this;
                
                manageActivity.updateDataActivity(that.parameters, (dataActivity) => {
                   
                    manageQuestionActivity.getQuestionActivityIds(that.parameters.id, idsQuestions => {
                        
                        manageAlternativeQuestion.removeDataAlternative(idsQuestions, dataRemoveQuestion =>{
                            
                            manageQuestionActivity.removeDataQuestions(that.parameters.id, () =>{

                                that.parameters.questions.forEach((question, indexQuestion) => {
                                    
                                    manageQuestionActivity.insertDataQuestion(question, that.parameters.id, 
                                    dataQuestion =>{
                                        that.parameters.questions[indexQuestion].id = dataQuestion[0].id_question;
                                        
                                        if(question.alternatives != null){
                                            question.alternatives.forEach((alternative, indexAlternative) => {
                                                
                                                manageAlternativeQuestion.insertDataAlternative(
                                                alternative, dataQuestion[0].id_question,
                                                dataAlternative =>{
                                                    that.parameters.questions[indexQuestion].alternatives[indexAlternative].id =
                                                    dataAlternative[0].id_alternative;
                                                    
                                                    if(indexQuestion == that.parameters.questions.length-1 &&
                                                        indexAlternative == that.parameters.questions[indexQuestion].alternatives.length-1){
                                                            return callback(that.parameters);
                                                    }
                                                });
                                            });
                                        }else{
                                            if(indexQuestion == that.parameters.questions.length-1){
                                                    return callback(that.parameters);
                                            }
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            break;
        }
    }
}

module.exports = ManageUpdate;