const sqlite3 = require('sqlite3').verbose()

//iniciar o objeto no banco de dados

//por um construtor ou classe

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//usar o objetode banco de dados para nossas operações

// db.serialize(() => {
//   //criar a tabela com comandos SQL (nome places)
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   //inserir dados
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (
//       ?,?,?,?,?,?,?
//     );
//   `

//   const values = [
//     "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     "Paperside",
//     "rua maneira, bairro bonito",
//     "Número 190",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Residuos Eletrôicos, Lâmpadas"
//   ]

//   // função de callback é dada como parâmetro e chamada após a função pai ser executada

//   function afterInsertData(err) {
//     if(err){
//       return console.log(err)
//     }

//     console.log("cadastro com sucesso")
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData )

//   //consultar os dados

//   // db.all(`SELECT * FROM places`, function(err, rows){
//   //   if(err){
//   //     return console.log(err)
//   //   }
    
//   //   console.log("Aqui estão os registros")
//   //   console.log(rows)
//   // })

//   //deletar

//   // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//   //   if(err){
//   //     return console.log(err)
//   //   }
//   //   console.log("Registros Deletados")
//   // })

// })