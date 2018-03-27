class ConfigReward{
    constructor(){
        this.rewards = [{
            "id" : 6,
            "name" : "goldTask",     
            "config": {
                "name" : "percentageToComplete",
                "percentageToComplete" : 0
            }},{
            "id" : 7,
            "name" : "silverTask",     
            "config": {
                "name" : "percentageToComplete",
                "percentageToComplete" : 0
            }},{
            "id" : 8,
            "name" : "bronzeTask",     
            "config": {
                "name" : "percentageToComplete",
                "percentageToComplete" : 0
            }},{
            "id" : 4,
            "name" : "sequenceTask",     
            "config": {
                "name" : "amount",
                "amount": 0
            }},{
            "id" : 12,
            "name" : "sequenceGoldTask",     
            "config": {
                "name" : "amount",
                "amount": 0
            }},{
            "id" : 13,
            "name" : "sequenceSilverTask",     
            "config": {
                "name" : "amount",
                "amount": 0
            }},{
            "id" : 14,
            "name" : "sequenceBronzeTask",     
            "config": {
                "name" : "amount",
                "amount": 0
            }}
        ]
    }

    setConfig(registers){
        var rewards = this.rewards;
        registers.forEach(function(registry, i){
                if(registry.id_reward == rewards[i].id){
                    if(registry.config){
                        rewards[i].config = JSON.parse(registry.config);
                    }
                }
        });
    }

    updateConfig(data, callback){
        this.rewards.forEach(function(registry, i){
            if(data.id == registry.id){
                registry.config[data.name] = data.value;
                return callback(registry.config);
            }
        });
    }

}