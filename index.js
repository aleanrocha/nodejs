/*
  - Query params => site.com/users?name=abreu&age=30 - FILTRO
  - Route params => /users/2 - BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
  - Request body => {"name": "zé", age:30}
*/

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

// criar rota
app.get('/users/', (request, response) => {
  // const name = request.query.name
  // const age = request.query.age

  // Query params
  // const {name, age} = request.query // destructuring 
  // return response.json({ name, age })

  // Route params
  // const { id } = request.params

  const { name, age } = request.body


  console.log(request)
  
  console.log(name, age)


  return response.json({name, age})

  // return response.send('Hello NodeJS')
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})