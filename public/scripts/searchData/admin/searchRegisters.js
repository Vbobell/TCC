var getGenericData = function(parameters, callback){
    $.ajax({
        url: '/admin/getData',
        type: 'GET',
        data: parameters,
        async : true
    }).done(function(data){
        callback(data);
    });
};
