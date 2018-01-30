var insertGenericData = function(parametres, callback){
    $.ajax({
        url: '/admin/insert',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: parametres,
        async : true
    }).done(function(){
        callback();
    });
};