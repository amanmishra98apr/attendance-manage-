var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.config();
var cors = require('cors');

var index = require('./routes/index');
//import leaves file
var leaves = require('./routes/leaves');
//import attendance_manage file
var attendance_manage = require('./routes/attendance_manage');
var reporting_manage = require('./routes/reporting_manage');
var holidays_manage = require('./routes/holidays_manage');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())

app.use('/', index);
//post api fetching leaves detail using id
app.use('/leaves', leaves);
//post api for fetching userAttendance
app.use('/attendance', attendance_manage);
//for report id
app.use('/report',reporting_manage)
//for holidays
app.use('/holidays',holidays_manage)


module.exports = app;
