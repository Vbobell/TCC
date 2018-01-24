var list = function(registres, callback){
    var structure = '<ul>';
    registres.forEach(function(item, i){
        structure += `<li> ${ item } </li>`; 
    });
    structure += '</ul>';
    callback(structure);
};