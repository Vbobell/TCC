const CrudDiscipline = require('../../../../models/crud/crudDiscipline/crud-discipline');

class ManageCourse{
    constructor(){
        this.crudDiscipline = new CrudDiscipline();
    }
    getDataDiscipline(parametres, callback){
        this.crudDiscipline.selectDisciplines(parametres.limit, parametres.offset , data =>{
            return callback(data);
        });
    }
    removeDiscipline(parametres, callback){
        let where = 'id_discipline = $1';
        let registre = [parametres.idDiscipline];
        this.crudDiscipline.executeDelete('discipline', where, registre, data =>{
            return callback(data);
        });
    }
    editDiscipline(parametres, callback){
        let values = '($1)';
        let registre = [parametres.nameDiscipline, parametres.idDiscipline];
        let where = 'id_discipline = $2';
        this.crudDiscipline.executeUpdate('discipline', '(name_discipline)', values, where, registre, data => {
            return callback(data);
        });
    }
}

module.exports = ManageCourse;