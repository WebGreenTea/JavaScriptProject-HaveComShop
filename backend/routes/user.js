const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const bodyPaser = require('body-parser')
const md5 = require('md5');
const jwt = require('jsonwebtoken')

const JWT_SECRET = "kjhkjh*&^lkhlkh)(*)KLJHKHJG^%$kuhsdflsdfshbss"
// Creating one
router.post('/register', async (req, res) => {
    //console.log(req.body)
    /*if(req.body.password.length < 8){
        return res.json({ msg: '' })
    }*/
    req.body.password = md5(req.body.password)
    //console.log(req.body.password)

    try {
        await UserModel.create(req.body)
        //console.log('user created successfully' + response)
        return res.json({ status: 'success' })
    } catch (error) {
        return res.json({ status: 'error' })
    }
})
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await UserModel.findOne({ username }).lean()
        if (!user) {
            return res.json({ status: 'err', error: 'Invalid username or password' })
        }
        else if (user.password == md5(password)) {
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, JWT_SECRET
            )
            return res.json({ status: 'ok', data: token })
        }
        else {
            return res.json({ status: 'err', error: 'Invalid username or password' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


})

router.post('/verify-token', async (req, res) => {
    const token = req.body.token
    //console.log(req.body)
    try {
        const user = jwt.verify(token, JWT_SECRET)
        return res.json({ username: (user.username), id: (user.id), login: true })
    } catch (e) {
        return res.json({ username: "", login: false })
    }
})

router.get('/getAddress/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        let user = await UserModel.findById(userID)
        let fulladdress = user.address
        //fulladdress.fullname = user.first_name + " " + user.last_name
        fulladdress.first_name = user.first_name;
        fulladdress.last_name = user.last_name

        fulladdress.phone = user.phone
        return res.json(user.address)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

router.post('/updateAddress/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        let data = {};
        if (req.body.first_name) {
            data.first_name = req.body.first_name
        }
        if (req.body.last_name) {
            data.last_name = req.body.last_name
        }
        let address = req.body.address
        data.address = address

        await UserModel.findByIdAndUpdate(req.params.id, data)
        return res.json({ status: 'success' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})


router.put('/changePassword/:id', async (req, res) => {

    const userID = req.params.id;
    try {
        const user = await UserModel.findById(userID)
        if (user.password == md5(req.body.currentPassword)) {
            const test = await UserModel.findByIdAndUpdate(userID, { password: (md5(req.body.newPassword)) })
            return res.json({ status: "success" })
        } else {
            return res.json({ status: "wrong password" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})



module.exports = router