class Question{
    constructor(id, type, description, alternatives){
        this.id = id;
        this.type = type;
        this.description = description;
        this.alternatives = alternatives;
    }
    checkEmpty(callback){
        if(this.description.length == 0){
            return callback(false);
        }else if(this.alternatives.length == 0){
            return callback(false);
        }else{
            return callback(true);
        }
    }
}