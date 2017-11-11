$(document).ready(function(){
    $('.menu-buttom').on('click', function(){

    });

    $('.item').on('click', function(){
        $('.content').fadeOut(2000, function(){
            $('[data-content="generic"]').remove();
            var url = $(this).attr('data-item') + '/' + 
            $(this).parent().attr('data-content') + '/?data=' + $(this).attr('data-item');
            $.ajax({
                url : url,
                dataType : 'html',
                type: 'GET'
            }).done(function(data){
                $('body').append($(data)[1]);
                $('body').append($(data)[3]);
                $('.content[data-content="generic"]').fadeIn(2000);
            });
        });
    });
});