const CrudClass = require('../../../../models/crud/crudClass/crud-class');

class ManageClass {
    constructor() {
        this.crudClass = new CrudClass();
    }
    getDataClass(callback) {
        this.crudClass.selectClass(data => {
            return callback(data);
        });
    }
    removeClass(parameters, callback) {
        let where = 'id_class = $1';
        let registry = [parameters.idClass];
        
        this.crudClass.executeDelete('discipline_class', where, registry, () => {
            this.crudClass.executeDelete('teacher_class', where, registry, () => {
                this.crudClass.executeDelete('student_class', where, registry, () => {
                    this.crudClass.executeDelete('class_', where, registry, data => {
                        return callback(data);
                    });
                });
            });
        });
    }
    editClass(parameters, callback) {
        let registry = [parameters.nameClass, parameters.idClass];
        let where = 'id_class = $2';
        this.crudClass.executeUpdateSet('class_', 'SET name_class = $1', where, registry, data => {
            return callback(data);
        });
    }
}

module.exports = ManageClass;