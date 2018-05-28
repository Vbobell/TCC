var user = "";

$(document).ready(function(){
    user = JSON.parse(localStorage.getItem('user'));
    
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
        $('.item').addClass('inactive');
        var user = JSON.parse(localStorage.getItem('user'));
        var dataSearch = { 
            'path' : $(this).parent().attr('data-path'),  
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
                data : dataSearch,
                dataType : 'html',
                async : true,
                type: 'GET'
            }).done(function(data){
                if($('[data-content="generic"]').length == 0){
                    $('body').append($(data)[1]);
                    $('body').append($(data)[3]);
                    setTimeout(function(){
                        $('.page-content[data-content="generic"]').attr("data-id", dataSearch.controller.parameters.idDiscipline);
                        $('.page-content[data-content="generic"]').fadeIn(200);
                    },200);
                    if(!key){
                        $('.item').removeClass('inactive');
                        $('.inner-header h1').append('<span> > '+disciplineText+'</span><span> > '+$('.title-content h2').text()+'</span>');
                        key = true;
                    }
                }
            });
        });
    });
    
    if(user){
        $.ajax({
            url : 'svg/users/'+user.identity,
            dataType : 'html',
            async : true,
            type: 'GET'
        }).done(function(data){
            $('.identify-user figure').append(data);
        });
    }

    $('.identify-user').on('click', function(){
        if($('.config-user').is(':visible')){
            $('.config-user').slideUp(200);
        }else{
            $('.config-user').slideDown(200);
        }
    });

    $('.acount-edit').on('click', function(){
    user = JSON.parse(localStorage.getItem('user'));
        
    var dataSearch = { 
            'path' : '',  
            'file' : 'user-edit',
            'controller' : {
                'type': 'search',
                'entity': 'teacherUser',
                'parameters': {
                    'idTeacher': user.id
                }
            }
        };

        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/teacher/route/',
                data : dataSearch,
                dataType : 'html',
                async : true,
                type: 'GET'
            }).done(function(data){
                if($('[data-content="generic"]').length == 0){
                    $('body').append($(data)[1]);
                    $('body').append($(data)[3]);
                    setTimeout(function(){
                        $('.page-content[data-content="generic"]').fadeIn(200);
                    },200);
                    if(!key){
                        $('.item').removeClass('inactive');
                        $('.inner-header h1').append('<span> > '+$('.title-content h2').text()+'</span>');
                        key = true;
                    }
                }
            });
        });
    });
});