var tblhrmcitypublicholidays = require("../models/tbl_hrm_city_public_holidays")
var tblhrmemployeedetails = require("../models/tbl_hrm_employee_details")

const sequalize = require("../common/dbconfig").sequelize;
const Sequalize = require("sequelize");



exports.userHolidays = (req, res, next) => {
//employee detail table
tblhrmemployeedetails  = tblhrmemployeedetails(sequalize, Sequalize)
var id=req.body.Emp_Id
tblhrmemployeedetails.findAll({
  where:{
    id:id
  }
}).then(ed_users => {
            console.log("done employee details")
            //holidays table
            tblhrmcitypublicholidays  = tblhrmcitypublicholidays(sequalize, Sequalize)
            tblhrmcitypublicholidays.findAll({
              where:{
                city_id:ed_users[0].city_id,
                active:1,
              }
            }).then(holiday => {
              list=[]
              try{
                var current_date=new Date().getFullYear()
                  var i=0
                while(true){
                  date_year=new Date(holiday[i].date).getUTCFullYear()
                  if(date_year==current_date){
                          list.push({id:holiday[i].id ,  date:holiday[i].date , holiday:holiday[i].holiday})
                        }
                        i=i+1
                      }
              }
              catch(err){
                console.log(err)
              }

                      res.json(list)
                      })

          })
}

/*
exports.userHolidays = (req, res, next) => {
tblemployeedesignations  = tblemployeedesignations(sequalize, Sequalize)
//var emp_id=req.body.Emp_Id
tblemployeedesignations.findAll({
where:{
  city_id:6
}
}).then(h_users => {
            res.json(h_users)
        })
}
*/
/*exports.userHolidays = (req, res, next) => {
tblhrmcitypublicholidays  = tblhrmcitypublicholidays(sequalize, Sequalize)
//var emp_id=req.body.Emp_Id
tblhrmcitypublicholidays.findAll({

}).then(h_users => {
            res.json(h_users)
        })
}*/
