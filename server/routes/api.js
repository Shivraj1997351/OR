const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://Shivraj1999:Shivraj%401999@cluster0.jq8gj.mongodb.net/eventsdb?retryWrites=true&w=majority"
mongoose.connect(db, err => {
    if (err) {
        console.log("Error" + err)
    } else {
        console.log('Connected')
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status('401').send('UnAuthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status('401').send('UnAuthorized Request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status('401').send('UnAuthorized Request')
    }
    req.userId = payload.subject
    next()
}
router.get('/', (req, res) => {
    res.send('From api route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    User.findOne({ email: userData.email }, (error, use) => {
        if (error) {
            console.log(error)
        } else {
            if (use) {
                //res.status(401).send('email already exists')
            } else {
                user.save((error, registeredUser) => {
                    if (error) {
                        console.log(error)
                    } else {
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
                    }

                })
            }
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                //res.status(401).send('Invalid email')
            } else {
                if (user.password !== userData.password) {
                    //res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})
module.exports = router