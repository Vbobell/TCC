class Activity{
    constructor(){
        this.id = null;
        this.questions = [];
        this.config = "";
    }
    addQuestion(question){
        try{
            if(!question) throw "empty";
            this.questions.push(question);
        }catch(e){
            console.log(e);
        }
    }
    removeQuestion(position){
        this.questions.splice(position, 1);
    }
    editQuestion(position, question){
        this.questions[position] = question;
    }
    mountObjectSave(config, callback){
        this.config = config;
        return callback(this);
    }
}

