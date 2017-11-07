$(document).ready(function(){
    $('.menu-buttom').on('click', function(){

    });

    $('.item').on('click', function(){
        var url = $(this).attr('data-item') + '/' + 
        $(this).parent().attr('data-content') + '/?data=' + $(this).attr('data-item');
        $.ajax({
            url : url,
            dataType : 'html',
            type: 'GET'
        }).done(function(data){
            $('body').append($(data)[1]);
            $('body').append($(data)[3]);
        });
    });
});