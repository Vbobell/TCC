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
        if(position == 0){
            this.questions.splice(position, position+1);
        }else{
            this.questions.splice(position-1, position);
        }
    }
    mountObjectSave(config, callback){
        this.config = config;
        return callback(this);
    }
}

