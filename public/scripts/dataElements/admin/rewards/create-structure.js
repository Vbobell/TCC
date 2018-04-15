class StructureConfigReward{
    constructor(config){
        this.configReward = config;
        this.html = "";
    }
    buildStructure(registers, callback){
        this.html = "";
        switch(registers.id_reward){
            case 6:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[0].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[0].config.percentageToComplete + '"/>';
                this.html += '<label for="'+registers.name_config+'"> porcentagem </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 7:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[1].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[1].config.percentageToComplete + '"/>';
                this.html += '<label for="'+registers.name_config+'"> porcentagem </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 8:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[2].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[2].config.percentageToComplete + '"/>';
                this.html += '<label for="'+registers.name_config+'"> porcentagem </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 4:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[3].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[3].config.amount + '"/>';
                this.html += '<label for="'+registers.name_config+'"> quantidade </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 12:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[4].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[4].config.amount + '"/>';
                this.html += '<label for="'+registers.name_config+'"> quantidade </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 13:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[5].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[5].config.amount + '"/>';
                this.html += '<label for="'+registers.name_config+'"> quantidade </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            case 14:
                this.html += '<div class="content-config">';
                this.html += '<label>' + registers.name_config + '</label>';
                this.html += '<div class="content-options-config">';
                this.html += '<input type="number" class="data-config" id="'+registers.name_config+'" ';
                this.html += 'name="' + this.configReward.rewards[6].config.name + '" ';
                this.html += 'value="'+ this.configReward.rewards[6].config.amount + '"/>';
                this.html += '<label for="'+registers.name_config+'"> quantidade </label>';
                this.html += '</div>';
                this.html += '</div>';
                return callback(this.html);
            default:
                return callback(false);
        }
    }
}