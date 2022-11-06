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
      store: MongoStore.create({ mongoUrl: 'mongodb://kurivyan.kz:27017'})
    })
)
const { MongoClient } = require ("mongodb") //MongoDb Connection
const uri = "mongodb://kurivyan.kz:27017";
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './src')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/ejs/'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/test', (req, res) => {
    var message_content = req.body.message_body
    var message_time = new Date();

    var inputSchema = {
        "text" : message_content,
        "time" : message_time
    }

    async function abc() {
        let db = client.db('tempbase');
        let coll = db.collection('contact');
               
        await coll.insertOne(inputSchema);
        res.redirect('/')
    }
    abc()
})

app.get('*', (req, res) => {
    res.render('rout_error')
})

app.listen(3000, () => {
    console.log(`Server Started !`)
})