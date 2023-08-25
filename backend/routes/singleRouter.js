const express = require('express')
const router = express.Router()


const singlehotel = require('../controllers/singlehotelController')



router.route("/:id").get(singlehotel)

module.exports = router