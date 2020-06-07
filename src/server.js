const express = require('express')
const server = express()


// pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica

server.use(express.static('public'))

//habilitar o body da aplicação
server.use(express.urlencoded({extended: true}))

//ussndo o template engine

const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
  //qual o servidor
  express: server,
  // se o cache vai armazenar páginas ou dados velhos
  noCache: true
})




//configurar os caminhos

server.get('/', (req, res) => {
  return res.render('index.html', {
    title: 'Seu marketplace de coleta de resíduos'
  })
})


server.get('/create', (req, res) => {

  return res.render('create.html')
})   

server.post('/create', (req, res) => {

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (
      ?,?,?,?,?,?,?
    );
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  // função de callback é dada como parâmetro e chamada após a função pai ser executada

  function afterInsertData(err) {
    if(err){
      console.log(err)
      return res.send("Erro no cadastro")
    }

    console.log("cadastro com sucesso")
    console.log(this)

    return res.render('create.html', {saved:true})
  }

  db.run(query, values, afterInsertData )

})


server.get('/search', (req, res) => {

  const search = req.query.search

  if(search == ""){
    return res.render('search.html',{ total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err){
      return console.log(err)
    }

    const total = rows.length
    
    return res.render('search.html',{ places: rows, total })
  })

})

//ligar o servidor

server.listen(3000)