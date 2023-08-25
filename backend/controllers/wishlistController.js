const Wishlist = require('../model/wishlistModel')


const createWishlist = async (req,res)=>{
    const newWishlist = new Wishlist(req.body)
    try{
        const savedWishList = await newWishlist.save()
        res.status(201).json(savedWishList)
    }catch(err){
        res.status(500).json({message : "failed to create wishlist"})
    }
}

const deleteWishlist = async (req,res)=>{
    try{
        await Wishlist.findByIdAndDelete(req.params.id)
        res.json({message: "deleted hotel from wishlist"})
    }catch(err){
        res.status(500).json({message : "failed to delete hotel from wishlist"})
    }
}


const togetWishlist = async (req,res)=>{
    try{
        const wishlist = await Wishlist.find({})
        wishlist ? res.json(wishlist) : res.json({message : "no items found"})

    }catch(err){
        res.status(500).json(err)
    }
}

module.exports =  { createWishlist , deleteWishlist, togetWishlist }