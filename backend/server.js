const express = require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const dotenv = require('dotenv')
dotenv.config()



const hoteldataimported = require('./routes/DataImportRouter')
const categoryimported = require('./routes/categoryImportRoute')

const getAllHotels = require('./routes/hotelRouter')
const categoryRoute = require('./routes/categoryRouter')

const singleHotel = require('./routes/singleRouter')
const authRouter = require('./routes/authRouter')
const wishlistRouter = require('./routes/wishlistRouter')


const connectDB = require('./config/dbconfig')

const app = express()

app.use(cors())
app.use(express.json())
connectDB()

app.get("/", (req,res)=>{
    res.send("jsons")
})


app.use("/api/hoteldata", hoteldataimported )
app.use("/api/categorydata", categoryimported)

app.use("/api/hotels", getAllHotels)
app.use("/api/categories", categoryRoute)

app.use("/api/hotels", singleHotel)
app.use("/api/auth", authRouter)
app.use("/api/wishlist", wishlistRouter)




mongoose.connection.once("open", ()=>{
    console.log(`connected to db ` )
})



app.listen(process.env.PORT , ()=>{
    console.log("server started")
})