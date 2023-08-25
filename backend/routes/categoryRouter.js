const express = require("express");

const router = express.Router();
const category  = require('../controllers/categoryController');


router.route("/").get(category);


module.exports = router;
