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
                    $('header h1 span').text(element.find('p').text());
                });
            }, 200);
        }
    });

    $('.item').on('click', function(){
        var data = { 
            'path' : $(this).parent().attr('data-content') ,  
            'file' : $(this).attr('data-item')
        };
        $('.page-content').fadeOut(1000, function(){
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
                $('.page-content[data-content="generic"]').fadeIn(1000);
            });
        });
    });
});