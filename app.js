//incluido uma bilbioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');
//definicao de endereco / URL
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// implementação da regra de negocio
const server = http.createServer((req, res) => {

  let resposta;
  const urlparse = url.parse(req.url, true);
  //receber informacoes do usuario
  const params = queryString.parse(urlparse.search);
 
  //Criar um usuario e Atualizar um usuario
  if(urlparse.pathname == '/criar-atualizar-usuario'){
    console.log(params);
  // salvar as informacoes
    fs.writeFile('users/'+ params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');
      resposta= 'usuario criado com sucesso';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
    
  }
  // Seleciona Usuario
  else if(urlparse.pathname == '/selecionar-usuario'){
  fs.readFile('users/' + params.id + '.txt', function(err, data) {
    
    resposta = data;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'apllication/json');
    res.end(resposta);
  });
  
 }
//remover usuario
else if(urlparse.pathname == '/remover-usuario'){
  fs.unlink('users/' + params.id + '.txt', function (err) {
    
    console.log('File deleted!');
    resposta = err ? 'usuario nao encontrado' : 'usuario removido';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  });
 
  
 }

});
//execução 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// 127.0.0.1:3000/selecionar-usuario?id=2
// 127.0.0.1:3000/criar-atualizar-usuario?nome=erik&idade=80&id=2
// 127.0.0.1:3000/selecionar-usuario?id=2
// 127.0.0.1:3000/remover-usuario?id=2
 