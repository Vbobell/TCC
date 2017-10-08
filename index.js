var express = require('express');
const pool = require('./lib/db');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/meta', function(request, response) {
  response.render('pages/meta');
});

app.get('/prestadoresServico', function(request, response){
  pool.connect( function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }

  var querySearch = 'SELECT prestador.imagem, prestador.nome, prestador.profissao,';
      querySearch += 'endereco.cidade, endereco.bairro, endereco.endereco,';
      querySearch += 'contato.dddT, contato.telefone, contato.dddW, contato.whats, contato.email ';
      querySearch += 'FROM prestador, endereco, contato ';
      querySearch += 'WHERE prestador.idPrestador = endereco.idPrestador ';
      querySearch += 'AND prestador.idPrestador = contato.idPrestador';

  client.query(querySearch, function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    response.json({"prestadorServico" : result.rows});
  });

});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




