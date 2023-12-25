/*
  - Query params => site.com/users?name=abreu&age=30 - FILTRO
  - Route params => /users/2 - BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
  - Request body => {"name": "zé", age:30}

  - GET => Buscar informações no Back-End
  - POST => Criar informações no Back-End
  - PUT/PATCH => Altera/Atualiza informações no Back-End
  - DELETE => Deleta informações no Back-End

*/

const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())

const users = []

// criar rota
app.get('/users/', (request, response) => {
  // retorna todos os usuários
  return response.json(users)
})

// cria um novo usuário
app.post('/users/', (request, response) => {
  const {name, age} = request.body
  const user = {id:uuid.v4(), name, age}
  users.push(user)
  return response.status(201).json(user)
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})