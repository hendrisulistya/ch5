const fs = require('fs')
const express = require('express')
const router = express.Router()


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

    userdb.forEach((data) => {
        if (username == data.username && password == data.password) {
            isLogin = true
            res.redirect('/game')
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
    const users = []
    const {
        username,
        password
    } = req.body

    users.push({
        username,
        password
    })
    res.redirect('/login')
});

module.exports = router