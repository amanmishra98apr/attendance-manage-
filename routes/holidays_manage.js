var express = require('express');
var router = express.Router();
var holidays_rec = require("../controller/holidays_rec")

/* post  users listing. */
router.post('/', holidays_rec.userHolidays);

module.exports = router;
