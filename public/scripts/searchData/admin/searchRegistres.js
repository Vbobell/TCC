(function () {
    var getGenericData = function(parametres, callback){
        $.ajax({
            url: '/admin/getData',
            type: 'GET',
            data: parametres,
            async : true
        }).done(function(data){
            callback(data);
        });
    };
})();
