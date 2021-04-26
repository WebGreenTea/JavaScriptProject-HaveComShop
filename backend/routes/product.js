const express = require('express')
const router = express.Router()
const productModel = require('../models/product')
const bodyPaser = require('body-parser')



router.post('/addPD', async (req, res) => {
    //console.log(req.body)
    let data = {}
    try {
        //console.log(req.body.review)
        data = {
            PDname: req.body.name,
            price: req.body.price,
            count: req.body.count,
            type: req.body.type,
            img: req.body.url
        }
        if (req.body.more) {
            data.detail = req.body.more
        } 
        if(req.body.review){
            //let IDreview = (req.body.review).split("/")
            data.review = req.body.review
        }
        //console.log(data)
        const response = await productModel.create(data)
        //console.log(response)
        res.json({ status: 'success' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error' })
    }
})

router.get('/getPD', async (req, res, next) => {
    await productModel.find((error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/CPU', async (req, res, next) => {
    await productModel.find({type: 'CPU'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/RAM', async (req, res, next) => {
    await productModel.find({type: 'RAM'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/VGA', async (req, res, next) => {
    await productModel.find({type: 'VGA'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/Mainboard', async (req, res, next) => {
    await productModel.find({type: 'Mainboard'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/HDD-SSD', async (req, res, next) => {
    await productModel.find({type: 'HDD-SSD'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/PSU', async (req, res, next) => {
    await productModel.find({type: 'PSU'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/Case', async (req, res, next) => {
    await productModel.find({type: 'Case'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/cooler', async (req, res, next) => {
    await productModel.find({type: 'cooler'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/more', async (req, res, next) => {
    await productModel.find({type: 'more'},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/getPD/:id', async (req, res) => {
    let product
    try {
        product = await productModel.findById(req.params.id)
        //console.log(product)
        if (product == null) {
            return res.status(404).json({ message: "Cannot find this Product" })
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    return res.json(product)
    
})

router.put('/updateCount/:id', async (req, res, next) => {
    let product = await productModel.findById(req.params.id,(err) =>{
        if(err){
            return next(error)
        }
    })
    let count = product.count;
    

    count += req.body.count;
    await productModel.findByIdAndUpdate(req.params.id,{count: count},(error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json({name: data.PDname,count:count})
        }
    })
})

module.exports = router