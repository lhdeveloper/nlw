const express = require("express");
const server = express();

// pegar o banco de dados
const db = require('./database/db.js')

// configurar pasta publica
server.use(express.static("dist"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

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

server.get('/create-point', (req, res) =>{

    // query (parametros) que vem na url;
    
    return res.render("create-point.html")
})

server.post('/save-point', (req, res) => {
    // req.body: o corpo do nosso formulario
    //console.log(req.body)

    // inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err){
        if(err){
            console.log(err);
        }

        console.log('Cadastrado com sucesso');
        console.log(this);

        return res.render("create-point.html", { saved: true})
    };

    db.run(query, values, afterInsertData)

})

server.get('/search', (req, res) =>{
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err);
        };

        const total = rows.length;
        return res.render("search-results.html", { places: rows, total})
    });
})

// ligar o servidor
server.listen(3000);