var list = function(registres, callback){
    var structure = '<ul>';
    registres.forEach(function(item, i){
        structure += `<li> ${ item } </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};

var listInputCheckBox = function(registres, callback){
    var structure = '<ul>';
    registres.forEach(function(item, i){
        structure += `<li><input name="${item.name + item.id}" type="checkbox"/> 
                     <label for="${item.name + item.id}">${ item.value }</label> </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};