class StructureActivity{
    constructor(){

    }

    mountStructure(question){
        var type = question.type == 'unique' ? 'radio' : 'checkbox';

        question.alternatives.forEach(function(alternative) {
            $(`.elements-question[data-content="${question.type}"] .alternative table tbody`).append(
                $('<tr>').append(
                    $('<td>').append(
                        $('<input>').attr({'type': type, 'name':'correct-'+ type}).prop({'checked': alternative.correct}).addClass('correct')
                    ).addClass('col-2 col-xl-1 content-tool')
                ).append(
                    $('<td>').append(
                        $('<p>').attr('contenteditable', true)
                        .addClass('description').text(alternative.description)
                    ).addClass('col-8 col-xl-10')
                ).append(
                    $('<td>').append(
                        $('<button>').addClass('tool remove')
                    ).addClass('col-2 col-xl-1 content-tool')
                ).addClass('row-data')
            );
        });
    }

    mountStructureRA(position, question){
        var type = question.type == 'unique' ? 'radio' : 'checkbox';

        question.alternatives.forEach(function(alternative, index) {
            $(`.elements-question[data-content="${question.type}"] .alternative table tbody`).append(
                $('<tr>').append(
                    $('<td>').append(
                        $('<input>').attr({'type': type, 'name':'correct-'+ type, 'data-alternative':index})
                        .prop({'checked': alternative.correct}).addClass('correct')
                    ).addClass('col-2 col-xl-1 content-tool')
                ).append(
                    $('<td>').append(
                        $('<p>').addClass('description').text(alternative.description)
                    ).addClass('col-10 col-xl-11')
                ).attr({'data-question': position}).addClass('row-data')
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
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr:not(.not-alternative)`).remove();
                this.mountStructure(question);
            break;
            case 'draw':
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
            break;
            default:
            break;
        }
        $('#save-question').attr({'data-save':'edit', 'data-edit': position});
        $('.question-action label').text('Editar questão');
        $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr.not-alternative`).hide();
        $(`.type-question figure[data-tool="${question.type}"]`).click();
    }

    setElementsRA(position, question){
        switch(question.type){
            case 'unique':
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr:not(.not-alternative)`).remove();
                this.mountStructureRA(position, question);
            break;
            case 'multiple':
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .alternative table tbody tr:not(.not-alternative)`).remove();
                this.mountStructureRA(position, question);
            break;
            case 'draw':
                $(`.elements-question[data-content="${question.type}"] .question .description`).text(question.description);
                $(`.elements-question[data-content="${question.type}"] .question .answer`).attr({'data-question': position});
            break;
            default:
            break;
        }

        $('.elements-question').hide();
        $(`.elements-question[data-content="${question.type}"]`).fadeIn(200);
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