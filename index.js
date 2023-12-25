/*
  - Query params => site.com/users?name=abreu&age=30 - FILTRO
  - Route params => /users/2 - BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
  - Request body => {"name": "zé", age:30}

  - GET => Buscar informações no Back-End
  - POST => Criar informações no Back-End
  - PUT/PATCH => Altera/Atualiza informações no Back-End
  - DELETE => Deleta informações no Back-End

  - Meddlewares => INTERCEPTADOR - Tem o poder de parar ou alterar dados da requisição

*/

const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())

const users = []

/*
const myFirstMiddleware = (request, response, next) => {
  console.log('Eu Middleware fui chamado e interceptei a rota!')

  next() // dar continuidade ao fluxo da aplicação
  
  console.log('fINALIZANDO!!!')
}
*/

// chamo o middleware
//app.use(myFirstMiddleware)

const checkUserId = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error: 'User Not found'})
  request.userIndex = index
  request.userId = id
  next()
}

// criar rota
app.get('/users/', (request, response) => {
  console.log('A rota foi chamada!')
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

// atualizar usuário
app.put('/users/:id', checkUserId, (request, response) => {
  const { name, age } = request.body
  const index = request.userIndex
  const id = request.userId
  const updatedUser = {id, name, age}  
  users[index] = updatedUser
  return response.json(updatedUser)
})

// deletar usuário
app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex
  users.splice(index,1)
  return response.status(204).json()
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})