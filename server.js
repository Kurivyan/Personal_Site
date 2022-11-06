const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
    session({
      secret : 'secretkey',
      key : 'seed',
      cookie : {
          httpOnly : true,
          maxAge : null
      },
      store: MongoStore.create({ mongoUrl: 'mongodb://86.107.199.106:27017'})
    })
)

const { MongoClient, ServerApiVersion } = require('mongodb'); //MongoDb Connection
const uri = "mongodb://86.107.199.106:27017"; 
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './src')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/ejs/'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.render('rout_error')
})

app.listen(3000, () => {
    console.log(`Server Started !`)
})