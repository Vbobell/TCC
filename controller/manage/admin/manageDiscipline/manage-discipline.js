const CrudDiscipline = require('../../../../models/crud/crudDiscipline/crud-discipline');

class ManageCourse{
    constructor(){
        this.crudDiscipline = new CrudDiscipline();
    }
    getDataDiscipline(parameters, callback){
        this.crudDiscipline.selectDisciplines(parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    removeDiscipline(parameters, callback){
        let where = 'id_discipline = $1';
        let registre = [parameters.idDiscipline];
        this.crudDiscipline.executeDelete('discipline', where, registre, data =>{
            return callback(data);
        });
    }
    editDiscipline(parameters, callback){
        let values = '($1, $2)';
        let registre = [parameters.nameDiscipline, parameters.descriptionDiscipline, parameters.idDiscipline];
        let where = 'id_discipline = $3';
        this.crudDiscipline.executeUpdate('discipline', '(name_discipline, description_discipline)', values, where, registre, data => {
            return callback(data);
        });
    }
}

module.exports = ManageCourse;