const fs = require('fs')
const express = require('express')
const router = express.Router()

// let userdata = fs.readFileSync('./db/users.json');
// let userdb = JSON.parse(userdata)
let userdb = require('../db/users.json')
console.log(userdb);

let isLogin = false

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res) => {
    if (isLogin) {
        res.redirect('/game')
    } else {
        res.render('login')
    }

})

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body

    userdb.forEach((data, i) => {
        if (username === data.username[i] && password === data.password[i]) {
            isLogin = true
        }
    })

})

router.get('/game', (req, res) => {
    if (isLogin) {
        res.render('game')
    } else
        res.redirect('/login')
})



router.get('/register', (req, res) => {
    if (isLogin) {
        res.redirect('/game')
    } else {
        res.render('register')
    }
})

router.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body

    const id = userdb.length === 0 ? 1 : userdb[userdb.length - 1].id

    const user = {
        id,
        username,
        password
    }
    userdb.push(user)

});

module.exports = router