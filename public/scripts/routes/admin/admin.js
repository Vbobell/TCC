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
                        $('.inner-header h1').append('<span> > '+$('.title-content h2').text()+'</span>');
                        key = true;
                    }
                }
            });
        });
    });
});