const express = require('express')
const verifytoken = require('../middleware/verifytoken')
const {createWishlist, deleteWishlist, togetWishlist } = require('../controllers/wishlistController')
const router = express.Router()




router.route("/").post(verifytoken,createWishlist)
router.route("/:id").delete(verifytoken, deleteWishlist )
router.route("/").get(verifytoken , togetWishlist)




module.exports = router