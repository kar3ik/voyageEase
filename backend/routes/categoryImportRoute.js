const express = require('express')
const Category = require('../model/categoryModel')
const categories = require('../data/categories')

const router = express.Router()

router.route("/").post(async (req,res)=>{
    try{
        await Category.deleteMany({}) // Remove all documents
        const categoriesindb =await Category.insertMany(categories.data)
        res.json(categoriesindb)

    }catch(err){
        console.log(err)
        res.json({message : "could not add data"})
    }
    
})

module.exports = router