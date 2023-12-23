const express = require('express')
const app = express()

// criar rota
app.get('/users', (request, response) => {
  return response.send('Hello NodeJS')
})

// criar porta
app.listen(3000)