const express = require("express");
const server = express();

// configurar pasta publica
server.use(express.static("dist"))

// utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})



//configurar caminhos da minha aplicação
// pagina inicial
// req: Requisição
// res: Resposta
server.get('/', (rec, res) =>{
    return res.render("index.html", {
        title:`Seu marketplace de coleta de resíduos.`,
        description: `Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.`,
        buttonText: `Pesquisar pontos de coleta`
    })
})

server.get('/create-point', (rec, res) =>{
    return res.render("create-point.html")
})

server.get('/search', (rec, res) =>{
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000);