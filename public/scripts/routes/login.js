$(document).ready(function(){
    var width = $(window).width();

    if(width < 1024){
        $('body .login-background').after($('.user-access'));
    }

    $('.submit').on('click', function(){
        data = { 'user': $('input[name="user"]').val(), 'password': $('input[name="password"]').val()};
        $.ajax({
            url : 'login',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data : JSON.stringify(data),
            type: 'POST'
        }).done(function(data){
            if(data)
                window.location.href = '/admin';
            else
                alert('login invalido');
        });
    });
});