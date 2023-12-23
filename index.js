const express = require('express')
const app = express()
const port = 3000

// criar rota
app.get('/users', (request, response) => {
  return response.send('Hello NodeJS')
})

// criar porta
app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})