var fs = require('fs');

class Route{
    constructor(path, file, extension){
        this.path = path;
        this.file = file;
        this.extension = extension;
    }
    getRoute(callback){
        return callback(fs.existsSync(this.path + this.file + this.extension));
    }
}
module.exports = Route;