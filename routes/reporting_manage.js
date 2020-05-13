var express = require('express');
var router = express.Router();
var reporting_rec = require("../controller/reporting_rec")

/* post  users listing. */
router.post('/', reporting_rec.userReport);

module.exports = router;
