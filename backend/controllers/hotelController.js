const Hotel = require('../model/hotelModels')

const getAllhotel = async (req,res)=>{
    const hotelcategory = req.query.category
    try{
        let hotels
        if(hotelcategory){
            hotels = await Hotel.find({category : hotelcategory})
        }else{
            hotels = await Hotel.find({})
        }
        hotels ? res.json(hotels) : res.status(404).json({message : "no data found"})
    }catch(err){
        res.status(404).json({message : " not found"})
    }
}

module.exports = getAllhotel