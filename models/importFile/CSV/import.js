var csv = require('fast-csv');

class importFile{
    constructor(file, delimiter, lote){
        this.file = file;
        this.delimiter = delimiter;
        this.lote = lote;
    }

    returnData(dataArray){
        csv.fromPath(this.file, {delimiter : this.delimiter})
        .on("data", data =>{
           return dataArray(data);
        });
    }
}

module.exports = importFile;

