$(document).ready(function(){
    $('.menu-buttom').on('click', function(){

    });

    $('.item').on('click', function(){
        var data = { 'path' : $(this).attr('data-item') + '/' + $(this).parent().attr('data-content') + '/' ,  'file' : $(this).attr('data-item')};
        $('.content').fadeOut(1000, function(){
            $('[data-content="generic"]').remove();
            $.ajax({
                url : '/admin/route',
                data : data,
                dataType : 'html',
                async : false,
                type: 'GET'
            }).done(function(data){
                $('body').append($(data)[1]);
                $('body').append($(data)[3]);
                $('.content[data-content="generic"]').fadeIn(1000);
            });
        });
    });
});