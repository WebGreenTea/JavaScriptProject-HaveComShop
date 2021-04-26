const express = require('express')
const router = express.Router()
const cartModel = require('../models/cart')


router.put('/addToCart', async (req, res, next) => {
    let userID = req.body.userID
    let productID = req.body.productID
    let count = req.body.count
    let PDincart = await cartModel.findOne({userID:userID,productID:productID},(err,data) => {
        if(err){
            return next(err)
        }
    })
    if(PDincart == null){
        await cartModel.create({userID:userID,productID:productID,count:count},(err,data) =>{
            if(err){
                return next(err)
            }
        })
    }
    else{
        await cartModel.findByIdAndUpdate(PDincart._id,{count: (PDincart.count+count)},(err,data) =>{
            if(err){
                return next(err)
            }
        })
    }
    return res.json({success:true})
})

router.put('/updateCount/:id',async(req,res,next)=>{
    await cartModel.findByIdAndUpdate(req.params.id,{count:req.body.count},(err,data)=>{
        if(err){
            return next(err)
        }else{
            res.json({success:true})
        }
    })
})

router.get('/totalInCart/:id', async (req, res, next) => {
    await cartModel.find({userID:req.params.id},(err,data)=>{
        if(err){
            return next(err)
        }else{
            let countPDinCart = 0
            for (let dataInCart of data){
                countPDinCart+=dataInCart.count
            }
            return res.json({totalInCart:countPDinCart})
        }
    })
})

router.get('/list/:id', async (req, res, next) => {
    await cartModel.find({userID:req.params.id},(err,data)=>{
        if(err){
            return next(err)
        }else{
            return res.json(data)
        }
    })
})

router.delete('/delFromCart/:id', async (req,res,next) =>{
    await cartModel.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            return next(err)
        }else{
            res.json(data)
        }
    })
})

module.exports = router