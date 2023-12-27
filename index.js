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
const server = express()
const uuid = require('uuid')
const port = 3000

server.use(express.json())

const users = []

// middleware - check ID
const checkUserId = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error:'⚠️ User not found!'})
  request.userId = id
  request.userIndex = index
  next()
}

// middleware - print request
const printRequest = (request, response, next) => {
  console.log(request.method, request.url)
  next()
}

// get order list
server.get('/order', printRequest, (request, response) => {
  return response.json(users)
})

// create new order
server.post('/order', printRequest, (request, response) => {
  const { order, clientName, price, status } = request.body
  const user = {id:uuid.v4(), order, clientName, price, status}
  users.push(user)
  return response.status(201).json(user)
})

// change order
server.put('/order/:id', printRequest, checkUserId, (request, response) => {
  const {order, clientName, price, status } = request.body
  const index = request.userIndex
  const id = request.userId
  const updatedUser = {id, order, clientName, price, status}
  users[index] = updatedUser
  return response.json(updatedUser)
})

// delete order
server.delete('/order/:id', printRequest, checkUserId, (request, response) => {
  const index = request.userIndex
  users.splice(index,1)
  return response.status(204).json()
})

// change order status
server.patch('/order/:id', printRequest, checkUserId, (request, response) => {
  const { status } = request.body
  const id = request.userId
  const index = request.userIndex
  users[index].status = 'Pronto'
  return response.json(users[index])
})

// start server
server.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})
