const Hotel = require('../model/hotelModels')

const singlehotel = async (req,res)=>{
    try{
        const { id } = req.params;
        const hotel =await Hotel.findById(id)
        res.json(hotel) 

    }catch(err){
        res.status(404).json({message : "not found "})
    }
} 

module.exports = singlehotel
