var user = "";

$(document).ready(function(){
    user = JSON.parse(localStorage.getItem('user'));
    
    if(mobile){
        $('header h1').text( $('.menu-buttom.selected').find('p').text());
    }

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
                    if(!mobile){
                        $('header h1 span').remove();
                        $('header h1').append('<span> > '+element.find('p').text()+'</span>');
                    }else{
                        $('header h1').text(element.find('p').text());
                    }
                });
            }, 200);
        }
    });


    $('.item.discipline').on('click', function(){
        $('.item').addClass('inactive');
        var user = JSON.parse(localStorage.getItem('user'));
        var dataSearch = { 
            'path' : $(this).parent().attr('data-path'),  
            'file' : $(this).attr('data-item'),
            'controller' : {
                'type': 'search',
                'entity': 'studentDisciplineActivity',
                'parameters': {
                    'idDiscipline': $(this).attr('data-id'),
                    'idStudent': user.id
                }
            }
        };

        var disciplineText = $(this).find('h2').text();
        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/student/route/',
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
                        if(!mobile){
                            $('.inner-header h1').append('<span> > '+disciplineText+'</span><span> > '+$('.page-content[data-content="generic"] .title-content h2').text()+'</span>');
                        }else{
                            $('.inner-header h1').text($('.page-content[data-content="generic"] .title-content h2').text());
                        }
                        key = true;
                    }
                }
            });
        });
    });

    $('.item.add.topic').on('click', function(){
        $('.item').addClass('inactive');
        var user = JSON.parse(localStorage.getItem('user'));
        var dataSearch = { 
            'path' : $(this).parent().attr('data-path'),  
            'file' : $(this).attr('data-item'),
            'controller' : {
                'type': 'search',
                'entity': 'newTopic',
                'parameters': {
                    'registry': user.registry,
                }
            }
        };

        var topicText = $(this).find('h2').text();

        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/student/route/',
                data : dataSearch,
                dataType : 'html',
                async : true,
                type: 'GET'
            }).done(function(data){
                if($('[data-content="generic"]').length == 0){
                    $('body').append(data);
                    setTimeout(function(){
                        $('.page-content[data-content="generic"]').fadeIn(200);
                    },200);
                    if(!key){
                        $('.item').removeClass('inactive');
                        if(!mobile){                        
                            $('.inner-header h1').append('<span> > '+topicText+'</span><span> > '+$('.page-content[data-content="generic"] .title-content h2').text()+'</span>');
                        }else{
                            $('.inner-header h1').text($('.page-content[data-content="generic"] .title-content h2').text());
                        }

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

    $('.acount-edit').on('click', function(){
    user = JSON.parse(localStorage.getItem('user'));
        
    var dataSearch = { 
            'path' : '',  
            'file' : 'user-edit',
            'controller' : {
                'type': 'search',
                'entity': 'studentUser',
                'parameters': {
                    'idStudent': user.id
                }
            }
        };

        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/student/route/',
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
                        if(!mobile){
                            $('.inner-header h1').append('<span> > '+$('.page-content[data-content="generic"] .title-content h2').text()+'</span>');
                        }else{
                            $('.inner-header h1').text($('.page-content[data-content="generic"] .title-content h2').text());
                        }
                        key = true;
                    }
                }
            });
        });
    });
});