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
                if(mobile){
                    $('.page-content[data-content="' +element.attr('data-menu') + '"]').css('display','flex');
                }
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

    $('.item').on('click', function(){
        $('.item').addClass('inactive');
        var data = { 
            'path' : $(this).parent().attr('data-content') ,  
            'file' : $(this).attr('data-item')
        };
        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/admin/route/',
                data : data,
                dataType : 'html',
                async : true,
                type: 'GET'
            }).done(function(data){
                if($('[data-content="generic"]').length == 0){
                    $('body').append($(data)[1]);
                    $('body').append($(data)[3]);
                    $('body').append($(data)[5]);
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
                'entity': 'adminUser',
                'parameters': {
                    'idAdmin': user.id
                }
            }
        };

        var key = false;
        $('.page-content').fadeOut(200, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/admin/newRoute/',
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