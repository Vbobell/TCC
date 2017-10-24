var fs = require('fs');

class RouteImport{
    constructor(file, parametres){
        this.file = file;
        this.parametres = parametres;
    }
    getRoute(extension, callback){
        return callback(fs.existsSync(this.file + this.parametres.data + extension));
    }
}
module.exports = RouteImport;