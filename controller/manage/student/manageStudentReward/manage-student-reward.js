const CrudStudentReward = require('../../../../models/crud/crudStudentReward/crud-student-reward');
const ManageRewardConfig = require('../manageRewardConfig/manage-reward-config');

class ManageStudentReward {
    constructor() {
        this.crudStudentReward = new CrudStudentReward();
        this.data = '';
        this.isGold = false;
        this.isSilver = false;
        this.isBronze = false;
        this.rewards = [];
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
            let rewardLength = rewardsNotConfig.length;

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
                            that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 2:
                        if (parameters.activity.correct) {
                            that.getFirstCorrectActivity(registry, reward, (isFirstCorrect) => {
                                if (isFirstCorrect) {
                                    rewards.push(reward);
                                }
                                that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
                                    if (isReturn) {
                                        return callback(rewards);
                                    }
                                    count++;
                                });
                            });
                        } else {
                            that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        }
                        break;
                    case 3:
                        if (parameters.activity.correct) {
                            that.getFirstDoActivity(registry, reward, (isFirstDo) => {
                                if (isFirstDo) {
                                    rewards.push(reward);
                                }
                                that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
                                    if (isReturn) {
                                        return callback(rewards);
                                    }
                                    count++;
                                });
                            });
                        } else {
                            that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        }
                        break;
                    case 5:
                        that.getCorrectActivity(registry, reward, (isCorrect) => {
                            if (isCorrect) {
                                rewards.push(reward);
                            }
                            that.checkReturnRewardNotConfig(count, rewardLength, (isReturn) => {
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

    getRewardsConfig(parameters, rewards, callback) {
        let manageRewardConfig = new ManageRewardConfig();
        this.rewards = rewards;
        let count = 0;
        let that = this;
        let rewardsConfig = "";
        let rewardsInsert = {
            gold:{
                rewards: [],
                registers: []
            },
            silver: {
                rewards: [],
                registers: []
            },
            bronze: {
                rewards: [],
                registers: []
            },
        };

        manageRewardConfig.getRewardConfigEnable((dataRewards) => {
            rewardsConfig = dataRewards;
            let rewardLength = rewardsConfig.length;

            let registry = {
                "idStudent": parameters.idStudent,
                "idDiscipline": parameters.activity.discipline,
                "idActivity": parameters.activity.id,
                "points": parameters.activity.points
            }

            rewardsConfig.forEach((reward, index) => {
                switch (reward.id) {
                    case 4:
                        that.getActivitySequence(registry, reward, (isSequence) => {
                            if (isSequence) {
                                that.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 6:
                        that.getActivityGold(registry, reward, (isGoldActivity) => {
                            if (isGoldActivity) {
                                that.isGold = true;
                                rewardsInsert.gold.registers.push([parseInt(registry.idStudent), reward.id]);
                                rewardsInsert.gold.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 7:
                        that.getActivitySilver(registry, reward, (isSilverActivity) => {
                            if (isSilverActivity) {
                                that.isSilver = true;
                                rewardsInsert.silver.registers.push([parseInt(registry.idStudent), reward.id]);
                                rewardsInsert.silver.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 8:
                        that.getActivityBronze(registry, reward, (isBronzeActivity) => {
                            if (isBronzeActivity) {
                                that.isBronze = true;
                                rewardsInsert.bronze.registers.push([parseInt(registry.idStudent), reward.id]);
                                rewardsInsert.bronze.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 12:
                        that.getActivityGoldSequence(registry, reward, (isSequenceGold) => {
                            if(isSequenceGold){
                                rewardsInsert.gold.registers.push([parseInt(registry.idStudent), reward.id]);
                                rewardsInsert.gold.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 13:
                        that.getActivitySilver(registry, reward, (isSequenceSilver) => {
                            if(isSequenceSilver){
                                rewardsInsert.silver.registers.push([parseInt(registry.idStudent), reward.id]);
                                rewardsInsert.silver.rewards.push(reward);
                            }
                            that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                                if (isReturn) {
                                    return callback(rewards);
                                }
                                count++;
                            });
                        });
                        break;
                    case 14:
                        that.checkReturnReward(count, rewardLength, rewardsInsert, (isReturn) => {
                            if (isReturn) {
                                return callback(rewards);
                            }
                            count++;
                        });
                        break;
                    default:
                        break;
                }
            });
        });
    }

    /*Rewards not config*/
    checkReturnRewardNotConfig(index, rewardLength, callback) {
        return callback(index == rewardLength - 1);
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
    checkReturnReward(index, rewardLength, rewards, callback) {
        let that = this;

        if (index == rewardLength - 1) {
            let registers = false;
            let parameter = "";

            if (this.isGold) {
                registers = rewards.gold.registers;
                parameter = "gold";
            } else if (this.isSilver) {
                registers = rewards.silver.registers;
                parameter = "silver";
            } else if (this.isBronze) {
                registers = rewards.bronze.registers;
                parameter = "bronze";
            }

            if (registers) {
                this.insertStudentRewards(registers, () => {
                    rewards[parameter].rewards.forEach((reward, index) => {
                        that.rewards.push(reward);

                        if(index == rewards[parameter].rewards.length-1){
                            return callback(true);
                        }
                    });
                });
            }
        } else {
            return callback(false);
        }
    }

    getActivitySequence(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idDiscipline,
            parameters.idStudent
        ]

        this.checkActivitySequence(getRegistry, JSON.parse(reward.config), (asSequence) => {
            if (asSequence) {
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

    checkActivitySequence(parameters, config, callback) {
        this.crudStudentReward.selectCheckActivitySequence(parameters, data => {
            let amount = Math.ceil(parseInt(data[0].count) / config.amount);
            if (data[0].count >= (amount * config.amount)) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    getActivityGold(parameters, reward, callback) {
        let that = this;
        let getRegistry = {
            "idActivity": parameters.idActivity,
            "points": parameters.points
        };

        this.checkActivityGold(getRegistry, JSON.parse(reward.config), (asGoldActivity) => {
            if (asGoldActivity) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivityGold(parameters, config, callback) {
        let selectParameters = [
            parameters.idActivity
        ]
        this.crudStudentReward.selectCheckActivityGold(selectParameters, data => {
            if (parseInt(data[0].count) > 0) {

                let porcentCorrect = parameters.points.pointsReached / parameters.points.points;
                let porcentToGold = config.percentageToComplete * 0.01;
                let isGoldActivity = parseFloat(porcentCorrect.toFixed(1)) >= porcentToGold;

                return callback(isGoldActivity);
            } else {
                return callback(false);
            }
        });
    }

    getActivitySilver(parameters, reward, callback) {
        let that = this;
        let getRegistry = {
            "idActivity": parameters.idActivity,
            "points": parameters.points
        };

        this.checkActivitySilver(getRegistry, JSON.parse(reward.config), (asSilverActivity) => {
            if (asSilverActivity) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivitySilver(parameters, config, callback) {
        let selectParameters = [
            parameters.idActivity
        ]
        this.crudStudentReward.selectCheckActivitySilver(selectParameters, data => {
            if (parseInt(data[0].count) > 0) {

                let porcentCorrect = parameters.points.pointsReached / parameters.points.points;
                let porcentToSilver = config.percentageToComplete * 0.01;
                let isSilverActivity = parseFloat(porcentCorrect.toFixed(1)) >= porcentToSilver;

                return callback(isSilverActivity);
            } else {
                return callback(false);
            }
        });
    }

    getActivityBronze(parameters, reward, callback) {
        let that = this;
        let getRegistry = {
            "idActivity": parameters.idActivity,
            "points": parameters.points
        };

        this.checkActivityBronze(getRegistry, JSON.parse(reward.config), (asBronzeActivity) => {
            if (asBronzeActivity) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivityBronze(parameters, config, callback) {
        let selectParameters = [
            parameters.idActivity
        ]
        this.crudStudentReward.selectCheckActivityBronze(selectParameters, data => {
            if (parseInt(data[0].count) > 0) {

                let porcentCorrect = parameters.points.pointsReached / parameters.points.points;
                let porcentToBronze = config.percentageToComplete * 0.01;
                let isBronzeActivity = parseFloat(porcentCorrect.toFixed(1)) >= porcentToBronze;

                return callback(isBronzeActivity);
            } else {
                return callback(false);
            }
        });
    }

    getActivityGoldSequence(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idDiscipline,
            parameters.idStudent
        ]

        this.checkActivityGoldSequence(getRegistry, JSON.parse(reward.config), (asGoldSequence) => {
            if (asGoldSequence) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivityGoldSequence(parameters, config, callback) {
        this.crudStudentReward.selectCheckActivityGoldSequence(parameters, data => {
            let amount = Math.ceil(parseInt(data[0].count) / config.amount);
            if (data[0].count >= (amount * config.amount)) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    getActivitySilverSequence(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idDiscipline,
            parameters.idStudent
        ]

        this.checkActivitySilverSequence(getRegistry, JSON.parse(reward.config), (asSilverSequence) => {
            if (asSilverSequence) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivitySilverSequence(parameters, config, callback) {
        this.crudStudentReward.selectCheckActivitySilverSequence(parameters, data => {
            let amount = Math.ceil(parseInt(data[0].count) / config.amount);
            if (data[0].count >= (amount * config.amount)) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    getActivityBronzeSequence(parameters, reward, callback) {
        let that = this;
        let getRegistry = [
            parameters.idDiscipline,
            parameters.idStudent
        ]

        this.checkActivityBronzeSequence(getRegistry, JSON.parse(reward.config), (asBronzeSequence) => {
            if (asBronzeSequence) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    checkActivityBronzeSequence(parameters, config, callback) {
        this.crudStudentReward.selectCheckActivityBronzeSequence(parameters, data => {
            let amount = Math.ceil(parseInt(data[0].count) / config.amount);
            if (data[0].count >= (amount * config.amount)) {
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

    insertStudentRewards(parameters, callback) {
        this.crudStudentReward.executeInsert(
            'student_reward',
            '(id_student, id_reward)',
            '($1, $2)',
            parameters,
            response => {
                return callback(response);
            });
    }

    /* Select rewards */
    selectRewards(parameters, callback) {
        let that = this;
        this.crudStudentReward.selectRewards([parameters.registry], (rewards) => {
            return callback(rewards);
        });
    }
    /* Select rewards */
}

module.exports = ManageStudentReward;