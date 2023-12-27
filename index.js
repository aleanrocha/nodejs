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


// get order list
server.get('/order', (request, response) => {
  return response.json(users)
})

// create new order
server.post('/order', (request, response) => {
  const { order, clientName, price, status } = request.body
  const user = {id:uuid.v4(), order, clientName, price, status}
  users.push(user)
  return response.status(201).json(user)
})

// change order
server.put('/order/:id', (request, response) => {
  const {order, clientName, price, status } = request.body
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error: 'User Not found'})
  const updatedUser = {id, order, clientName, price, status}
  users[index] = updatedUser
  return response.json(updatedUser)
})

// delete order
server.delete('/order/:id', (request, response) => {
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error: 'User not found'})
  users.splice(index,1)
  return response.status(204).json()
})

// change order status
server.patch('/order/:id', (request, response) => {
  const { id } = request.params
  const {order, clientName, price, status } = request.body
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error: 'User not found'})
  const updatedStatus = {id, order,clientName, price, status: 'Pronto'}
  users[index] = updatedStatus
  return response.json(updatedStatus)
})

// start server
server.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})
