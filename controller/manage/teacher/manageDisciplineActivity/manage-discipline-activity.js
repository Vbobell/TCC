const CrudDisciplineActivity = require('../../../../models/crud/crudDisciplineActivity/crud-discipline-activity');

class ManageDisciplineActivity{
    constructor(){
        this.crudDisciplineActivity = new CrudDisciplineActivity();
        this.data = ''; 
    }
    getDataDisciplineActivity(parameters, callback){
        this.crudDisciplineActivity.selectAcivity(parameters.registry, parameters.limit, parameters.offset , data =>{
            return callback(data);
        });
    }
}

module.exports = ManageDisciplineActivity;