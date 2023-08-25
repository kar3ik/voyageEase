const Category = require('../model/categoryModel')

const category= async (req,res)=>{
    try{
        const category = await Category.find({})
        res.json(category)
    }catch(err){
        res.status(404).json({message : "not found"})

    }
}



module.exports = category;

