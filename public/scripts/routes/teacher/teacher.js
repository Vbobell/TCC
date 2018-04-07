$(document).ready(function(){
    $('.menu-buttom').on('click', function(){
        if(!$('.page-content[data-content="' + $(this).attr('data-menu') + '"]').is(':visible')){
            $('.menu-buttom').removeClass('selected');
            var element = $(this);
            $('.page-content').fadeOut(200, function(){
                $('[data-content="generic"]').remove();
            });
            setTimeout(function(){
                $('.page-content[data-content="' +element.attr('data-menu') + '"]').fadeIn(400, function(){
                    element.addClass('selected');
                    $('header h1 span').remove();
                    $('header h1').append('<span> > atividades</span>');
                });
            }, 200);
        }
    });

    $('.add.activity').on('click', function(){
        var user = JSON.parse(localStorage.getItem('user'));
        var data = { 
            'path' : $(this).parent().attr('data-path') ,  
            'file' : $(this).attr('data-item'),
            'controller' : {
                'type': 'search',
                'entity': 'newActivity',
                'parameters': {
                    'registry': user.registry,
                    'ids': [6, 7, 8]
                }
            }
        }
        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/teacher/route/',
                data : data,
                dataType : 'html',
                async : false,
                type: 'GET'
            }).done(function(data){
                $('body').append($(data)[1]);
                $('body').append($(data)[3]);
                setTimeout(function(){
                    $('.page-content[data-content="generic"]').fadeIn(200);
                },200);
                if(!key){
                    $('.inner-header h1').append('<span> > '+$('.title-content h2').text()+'</span>');
                    key = true;
                }
            });
        });
    });

    $('.item.discipline.activity').on('click', function(){
        var user = JSON.parse(localStorage.getItem('user'));
        var data = { 
            'path' : $(this).parent().attr('data-path') ,  
            'file' : $(this).attr('data-item'),
            'controller' : {
                'type': 'search',
                'entity': 'disciplineActivity',
                'parameters': {
                    'idDiscipline': $(this).attr('data-id'),
                    'idTeacher': user.id
                }
            }
        };
        var disciplineText = $(this).find('h2').text();
        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/teacher/route/',
                data : data,
                dataType : 'html',
                async : false,
                type: 'GET'
            }).done(function(data){
                $('body').append($(data)[1]);
                setTimeout(function(){
                    $('.page-content[data-content="generic"]').fadeIn(200);
                },200);
                if(!key){
                    $('.inner-header h1').append('<span> > '+disciplineText+'</span><span> > '+$('.title-content h2').text()+'</span>');
                    key = true;
                }
            });
        });
    });
});