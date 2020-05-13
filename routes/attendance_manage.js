var express = require('express');
var router = express.Router();
var attendance_rec = require("../controller/attendance_rec")

/* post  users listing. */
router.post('/', attendance_rec.userAttendance);

module.exports = router;
