const CrudDisciplineActivity = require('../../../../models/crud/crudDisciplineActivity/crud-discipline-activity');

class ManageDisciplineActivity{
    constructor(){
        this.crudDisciplineActivity = new CrudDisciplineActivity();
        this.data = ''; 
    }
    getDataDisciplineActivity(parameters, callback){
        let registers = [parameters.idDiscipline, parameters.idTeacher];
        this.crudDisciplineActivity.selectAcivity(registers, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
    getDataStudentDisciplineActivity(parameters, callback){
        let registers = [parameters.idDiscipline];
        this.crudDisciplineActivity.selectDisciplineAcivity(registers, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageDisciplineActivity;