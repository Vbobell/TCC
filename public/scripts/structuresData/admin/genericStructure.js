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
        structure += `<li><input name="${item.name}" id="${item.value + item.id}" value="${item.id}" type="checkbox"/> 
                     <label for="${item.value + item.id}">${ item.value }</label> </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};