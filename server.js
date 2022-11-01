const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './src')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/ejs/'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/test', (req, res) => {
    res.send('kurivyan.kz/test site open!')
})

app.get('/*', (req, res) => {
    res.render('rout_error')
})

app.listen(3000, () => {
    console.log(`Server Started !`)
})