var csv = require('fast-csv');

class importFile{
    constructor(file, delimiter, lote){
        this.file = file;
        this.delimiter = delimiter;
        this.lote = lote;
    }

    returnData(dataArray){
        var array = [];
        csv.fromPath(this.file, {delimiter : this.delimiter, headers: false})
        .on("data", data =>{
           array.push(data);
        })
        .on("end", function(){
            return dataArray(array);
        });
    }
}

module.exports = importFile;

