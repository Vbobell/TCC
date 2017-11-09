$(document).ready(function(){
    $('.submit').on('click', function(){
        data = { 'user': $('input[name="user"]').val(), 'password': $('input[name="password"]').val()};
        console.log(data);
        $.ajax({
            url : 'login',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data : JSON.stringify(data),
            type: 'POST'
        }).done(function(data){
            console.log(data);
        });
    });
});