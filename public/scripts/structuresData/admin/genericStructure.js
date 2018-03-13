var list = function(registers, callback){
    var structure = '<ul>';
    registers.forEach(function(item, i){
        structure += `<li> ${ item } </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};

var listInputCheckBox = function(registers, callback){
    var structure = '<ul>';
    registers.forEach(function(item, i){
        structure += `<li><input name="${item.name}" id="${item.value + item.id}" value="${item.id}" type="checkbox"/> 
                     <label for="${item.value + item.id}">${ item.value }</label> </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};