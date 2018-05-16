const CrudStudentReward = require('../../../../models/crud/crudStudentReward/crud-student-reward');
const ManageRewardConfig = require('../manageRewardConfig/manage-reward-config');

class ManageStudentReward {
    constructor() {
        this.crudStudentReward = new CrudStudentReward();
        this.data = '';
    }

    getRewardsNotConfig(parameters, callback) {
        let manageRewardConfig = new ManageRewardConfig();
        let count = 0;
        let that = this;
        let rewardsNotConfig = "";
        let rewardsIsConfig = "";
        let rewards = [];

        manageRewardConfig.getRewardNotConfigEnable((dataRewards) => {
            rewardsNotConfig = dataRewards;

            let registry = {
                "idStudent": parameters.idStudent,
                "idDiscipline": parameters.activity.discipline,
                "idActivity": parameters.activity.id
            }

            rewardsNotConfig.forEach((reward, index) => {
                switch (reward.id) {
                    case 1:
                        that.getFirstActivity(registry, reward, (isFirstActivity) => {
                            if (isFirstActivity) {
                                rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardsNotConfig, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 2:
                        that.getFirstCorrectActivity(registry, reward, (isFirstCorrect) => {
                            if (parameters.activity.correct && isFirstCorrect) {
                                rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardsNotConfig, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 3:
                        that.getFirstDoActivity(registry, reward, (isFirstDo) => {
                            if (parameters.activity.correct && isFirstDo) {
                                rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardsNotConfig, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });

                        break;
                    case 5:
                        that.getCorrectActivity(registry, reward, (isCorrect) => {
                            if (isCorrect) {
                                rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardsNotConfig, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    default:
                        break;
                }
            });
        });
    }

    getRewardsConfig(parameters, callback) {
        let manageRewardConfig = new ManageRewardConfig();
        let count = 0;
        let that = this;
        let rewardsNotConfig = "";
        let rewardsIsConfig = "";
        let rewards = [];

        manageRewardConfig.getRewardConfigEnable((dataRewards) => {
            rewardsConfig = dataRewards;

            let registry = {
                "idStudent": parameters.idStudent,
                "idDiscipline": parameters.activity.discipline,
                "idActivity": parameters.activity.id
            }

            rewardsConfig.forEach((reward, index) => {
                switch (reward.id) {
                    case 6:

                        break;
                    case 7:

                        break;
                    case 8:

                        break;
                    case 4:

                        break;
                    case 12:

                        break;
                    case 13:

                        break;
                    case 14:

                        break;
                    default:
                        break;
                }
            });
        });
    }

    /*Rewards not config*/
    checkReturnReward(index, rewardsNotConfig, callback) {
        return callback(index == rewardsNotConfig.length - 1);
    }

    getFirstActivity(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idStudent,
            parameters.idDiscipline
        ];

        this.checkFirstActivity(getRegistry, (asFirstActivity) => {
            if (asFirstActivity) {

                let rewardRegistry = [
                    parameters.idStudent,
                    reward.id
                ];

                that.insertStudentReward(rewardRegistry, (data) => {
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    }

    checkFirstActivity(parameters, callback) {
        this.crudStudentReward.selectFirstActivity(parameters, data => {
            if (parseInt(data[0].count) > 1) {
                return callback(false);
            } else {
                return callback(true);
            }
        });
    }

    getFirstCorrectActivity(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idStudent,
            parameters.idDiscipline
        ];

        this.checkFirstCorrectActivity(getRegistry, (asFirstCorrect) => {
            if (asFirstCorrect) {

                let rewardRegistry = [
                    parameters.idStudent,
                    reward.id
                ];
                that.insertStudentReward(rewardRegistry, (data) => {
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    }

    checkFirstCorrectActivity(parameters, callback) {
        this.crudStudentReward.selectFirstCorrectActivity(parameters, data => {
            if (parseInt(data[0].count) > 0) {
                return callback(false);
            } else {
                return callback(true);
            }
        });
    }

    getFirstDoActivity(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idStudent,
            parameters.idDiscipline
        ];

        this.checkFirstDoActivity(getRegistry, (asFirstCorrect) => {
            if (asFirstCorrect) {

                let rewardRegistry = [
                    parameters.idStudent,
                    reward.id
                ];
                that.insertStudentReward(rewardRegistry, (data) => {
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    }

    checkFirstDoActivity(parameters, callback) {
        this.crudStudentReward.selectFirstDoActivity(parameters, data => {
            if (parseInt(data[0].count) > 0) {
                return callback(false);
            } else {
                return callback(true);
            }
        });
    }

    getCorrectActivity(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idActivity,
            parameters.idStudent,
            parameters.idDiscipline
        ];

        this.checkCorrectActivity(getRegistry, (asFirstCorrect) => {
            if (asFirstCorrect) {

                let rewardRegistry = [
                    parameters.idStudent,
                    reward.id
                ];
                that.insertStudentReward(rewardRegistry, (data) => {
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    }

    checkCorrectActivity(parameters, callback) {
        this.crudStudentReward.selectCorrectActivity(parameters, data => {
            if (parseInt(data[0].count) > 0) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }
    /*Rewards not config*/

    /*Rewards config*/
    getActivityGold(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idActivity
        ];

        this.checkActivityGold(getRegistry, JSON.parse(reward.config), (asFirstCorrect) => {
            if (asFirstCorrect) {

                let rewardRegistry = [
                    parameters.idStudent,
                    reward.id
                ];
                that.insertStudentReward(rewardRegistry, (data) => {
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    }

    checkActivityGold(parameters, config, callback) {
        this.crudStudentReward.selectCheckActivityGold(parameters, data => {

            if (parseInt(data[0].count) > 0) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }
    /*Rewards config*/

    insertStudentReward(parameters, callback) {
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