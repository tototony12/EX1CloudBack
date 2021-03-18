const express = require('express');
const app = express();



app.use(express.static(__dirname + '/public'))

app.listen(3003, (err) => {
    if (err) {
      throw err
    }
    console.log('Servidor iniciado en el puerto 3000')
  })

app.post('/', (req, res) => {
    console.log(req.body)
})

