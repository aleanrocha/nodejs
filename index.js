/*
  - Query params => site.com/users?name=abreu&age=30 - FILTRO
*/

const express = require('express')
const app = express()
const port = 3000

// criar rota
app.get('/users', (request, response) => {
  // const name = request.query.name
  // const age = request.query.age

  const {name, age} = request.query // destructuring assignment

  console.log(request)

  return response.json({ name, age })

  // return response.send('Hello NodeJS')
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})