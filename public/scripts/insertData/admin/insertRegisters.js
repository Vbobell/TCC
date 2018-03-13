var insertGenericData = function(parameters, callback){
    $.ajax({
        url: '/admin/insert',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: parameters,
        async : true
    }).done(function(){
        callback();
    });
};