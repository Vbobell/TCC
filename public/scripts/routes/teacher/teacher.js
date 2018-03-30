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
                    $('header h1').append('<span> > '+element.find('p').text()+'</span>');
                });
            }, 200);
        }
    });

    $('.item.activity').on('click', function(){
        var data = { 
            'path' : $(this).parent().attr('data-path') ,  
            'file' : $(this).attr('data-item'),
            'controller' : {
                'type': 'search',
                'entity': 'disciplineActivity',
                'parameters': {
                    'registry': $(this).attr('data-id')
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