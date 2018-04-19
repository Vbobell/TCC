class StructureActivity{
    constructor(){

    }

    mountStructure(question){
        var type = question.type == 'unique' ? 'radio' : 'checkbox';

        question.alternatives.forEach(function(alternative) {
            $(`.elements-question[data-content="${question.type}"] .alternative table tbody`).append(
                $('<tr>').append(
                    $('<td>').append(
                        $('<input>').attr({'type': type, 'name':'correct-'+ type,}).prop({'checked': alternative.correct}).addClass('correct')
                    ).addClass('col-xl-1 content-tool')
                ).append(
                    $('<td>').append(
                        $('<p>').attr('contenteditable', true)
                        .addClass('description').text(alternative.description)
                    ).addClass('col-xl-10')
                ).append(
                    $('<td>').append(
                        $('<button>').addClass('tool remove')
                    ).addClass('col-xl-1 content-tool')
                ).addClass('row-data')
            );
        });
    }

    setElements(position, question){
        switch(question.type){
            case 'unique':
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr:not(.not-alternative)`).remove();
                this.mountStructure(question);
            break;
            case 'multiple':
                $(`.type-question div[data-tool="${question.type}"]`).click();
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr:not(.not-alternative)`).remove();
                this.mountStructure(question);
            break;
            case 'draw':
                $(`.type-question div[data-tool="${question.type}"]`).click();
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
            break;
            default:
            break;
        }
        $('#save-question').attr({'data-save':'edit', 'data-edit': position});
        $('.question-action label').text('Editar questão');
        $(`.type-question figure[data-tool="${question.type}"]`).click();
    }

    mountListQuestion(questions, callback){
        questions.forEach(function(question, index) {
            $('li.questions ul').append(
                $('<li>').append(
                    $('<label>').text(question.description.substr(0, 10))
                ).append(
                    $('<div>').addClass('tool open-edit')
                ).append(
                    $('<div>').addClass('tool remove')
                ).addClass('question').attr('data-question', index)
            );
        });

        return callback();
    }

    setConfig(config){
        $('.content-config input[name="name-activity"]').val(config.nameActivity);
        $('.content-config textarea[name="description-activity"]').val(config.descriptionActivity);
        $('.content-config input[name="points-activity"]').val(config.pointActivity);
        $(`#discipline-${config.idDiscipline}`).prop('checked', true);
        config.rewards.forEach(function(reward, index){
            $(`.reward figure[data-id="${reward.id_reward}"]`).addClass('active');
        });
    }
}