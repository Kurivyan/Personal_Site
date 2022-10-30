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

app.listen(3000, () => {
    console.log(`Server Started !`)
})