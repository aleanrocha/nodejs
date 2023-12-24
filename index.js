/*
  - Query params => site.com/users?name=abreu&age=30 - FILTRO
  - Route params => /users/2 - BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
*/

const express = require('express')
const app = express()
const port = 3000

// criar rota
app.get('/users/:id', (request, response) => {
  // const name = request.query.name
  // const age = request.query.age

  // Query params
  // const {name, age} = request.query // destructuring 
  // return response.json({ name, age })


  // Route params
  const { id } = request.params

  console.log(id)


  return response.json({id})





  // return response.send('Hello NodeJS')
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})