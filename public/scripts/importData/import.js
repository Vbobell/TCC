(function(){
    var form;
    var upload = {
        file : function(element, label){
            element.change(function (event) {
                form = new FormData();
                form.append('csv', event.target.files[0]);
                if(event.target.files[0].type != "application/vnd.ms-excel"){
                    alert('Arquivo inválido');
                }else{
                    label.text(event.target.files[0].name);
                }
            });
        },
        uploadReady : function(elementSubmit, route){
            elementSubmit.on('click', function(){
                $.ajax({
                    url : route,
                    data: form,
                    processData: false,
                    contentType: false,
                    type: 'POST'
                }).done(function(data){
                    alert("Arquivo importado com sucesso!");
                });
            });
        }
    }

    window.upload = upload;
})();