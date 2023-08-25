// const express = require('express')
// const Hotel = require('../model/hotelModels')
// const hotels = require('../data/hotels')

// const router = express.Router()

// router.route("/").post(async (req,res)=>{
//     try{
//         await Hotel.deleteMany({})
//         const hotelsindb =await Hotel.insertMany(hotels.data)
//         res.json(hotelsindb)
//     }catch(err){
//         console.log(err)
//         res.json({message : "could not add data to db"})
//     }
    
// })

// module.exports = router

const express = require('express')
const Hotel = require('../model/hotelModels')
const hotels = require('../data/hotels')

const router = express.Router()

router.route("/").post(async (req, res) => {
    try {
        await Hotel.deleteMany({}) // Remove all documents
        const hotelsInDB = await Hotel.insertMany(hotels.data)
        res.json(hotelsInDB)
    } catch (err) {
        console.error(err)
        res.json({ message: "Could not add data to the database" })
    }
})

module.exports = router
