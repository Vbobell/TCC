const CrudStudentReward = require('../../../../models/crud/crudStudentReward/crud-student-reward');
const ManageRewardConfig = require('../manageRewardConfig/manage-reward-config');

class ManageStudentReward{
    constructor(){
        this.crudStudentReward = new CrudStudentReward();
        this.data = ''; 
    }

    getRewards(parameters, callback){
        let manageRewardConfig = new ManageRewardConfig();
        let count = 0;
        let that = this;
        let rewards = [];

        manageRewardConfig.getRewardNotConfigEnable((dataRewards) => {
            dataRewards.forEach((reward) => {
                switch(reward.name){
                    case 'first-activity':
                    let registry = [
                        parameters.idStudent
                    ];

                    that.checkFirstActivity(registry, (asFirstActivity) =>{
                        if(asFirstActivity){
                            registry.push(reward.id);

                            that.insertStudentReward(registry, (data) =>{
                                rewards.push(reward);
                                
                                if(count == (dataRewards.length-1)){
                                    return callback(rewards);
                                }
                                count++;
                                return;
                            });
                        }else{
                            if(count == (dataRewards.length-1)){
                                return callback(rewards);
                            }
                            count++;
                            return;
                        }
                    });
                    break;
                    default:
                        if(count == (dataRewards.length-1)){
                            return callback(rewards);
                        }
                        count++;
                        return;
                    break;
                }
            });
        });
    }

    checkFirstActivity(parameters, callback){
        this.crudStudentReward.selectFirstActivity(parameters, data =>{
            if(parseInt(data[0].count) > 1){
                return callback(false);
            }else{
                return callback(true);
            }
        });
    }

    insertStudentReward(parameters, callback){
        this.crudStudentReward.executeUniqueInsert(
            'student_reward', 
            '(id_student, id_reward)',
            '($1, $2)',
            'id_student_reward',
            parameters,
            response => {
                return callback(response);
            });
    }
}

module.exports = ManageStudentReward;