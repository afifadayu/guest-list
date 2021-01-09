require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT;

const userRoutes = require('./routes/userRoutes')
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.json({
    name: 'ali',
    age: 20
  })
})


// app.post('/user', (req, res) => {
//   res.json({
//     message: 'sekarang di user',
//     status: 'oke',
//     error: null
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})