const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const router = require('./routes/index')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(router)
app.listen(port, () => {
    console.log(`Example app listening at localhost:${port}`);
})