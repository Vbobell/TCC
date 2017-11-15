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
});