const Crud = require('../generic-crud');

class CrudTeacher extends Crud{
    constructor(data) {
        this.data = data;
    }
}

module.exports = CrudTeacher;