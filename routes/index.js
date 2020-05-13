var express = require('express');
var router = express.Router();
var profile = require("../controller/profile") 

/* GET users listing. */
router.get('/', profile.userProfile);

module.exports = router;
