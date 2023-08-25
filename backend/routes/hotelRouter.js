const express  = require("express");
const router = express.Router()
const getAllhotel = require('../controllers/hotelController')

router.route("/").get(getAllhotel)

module.exports = router 