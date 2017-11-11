$(document).ready(function(){
    $('.menu-buttom').on('click', function(){

    });

    $('.item').on('click', function(){
        var item = $(this);
        $('.content').fadeOut(1000, function(){
            var url = item.attr('data-item') + '/' + 
            item.parent().attr('data-content') + '/?data=' + item.attr('data-item');
            $('[data-content="generic"]').remove();
            $.ajax({
                url : url,
                dataType : 'html',
                type: 'GET'
            }).done(function(data){
                $('body').append($(data)[1]);
                $('body').append($(data)[3]);
                $('.content[data-content="generic"]').fadeIn(1000);
            });
        });
    });
});