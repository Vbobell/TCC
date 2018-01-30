var insertGenericData = function(parametres, callback){
    $.ajax({
        url: '/admin/insert',
        type: 'POST',
        data: parametres,
        async : true
    }).done(function(data){
        callback(data);
    });
};