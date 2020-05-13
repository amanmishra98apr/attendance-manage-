var tblhrmdailyrosterattendance = require("../models/tbl_hrm_daily_roster_attendance")
var tblhrmemployeedetails = require("../models/tbl_hrm_employee_details")
var tblemployeedesignations = require("../models/tbl_employee_designations")
var tblemployeedepartments = require("../models/tbl_employee_departments")
var tblhrmemployeeleavetrack = require("../models/tbl_hrm_employee_leave_track")
var tblhrmlogs = require("../models/tbl_hrm_logs")
const sequalize = require("../common/dbconfig").sequelize;
const Sequalize = require("sequelize");

tblhrmdailyrosterattendance = tblhrmdailyrosterattendance(sequalize, Sequalize)
tblhrmemployeedetails = tblhrmemployeedetails(sequalize, Sequalize)
tblemployeedesignations = tblemployeedesignations(sequalize, Sequalize)
tblemployeedepartments = tblemployeedepartments(sequalize, Sequalize)
tblhrmemployeeleavetrack = tblhrmemployeeleavetrack(sequalize, Sequalize)




// Find data from multiple tables

exports.userAttendance = (req, res, next) => {
var emp_id=req.body.Emp_Id
if(emp_id != null && emp_id != ''){
tblhrmdailyrosterattendance.findAll({
          offset:(req.body.Page_No-1)*10,limit:10,
          where:{
            emp_id:emp_id
          }

      }).then(a_users => {
          console.log('done attendance');
          var id=req.body.Emp_Id
          tblhrmemployeedetails.findAll({
            where:{
              id:id
            }
          }).then(l_users =>{
            console.log("****done emp detailes*****");

            tblemployeedesignations.findAll({
              where:{
                id:l_users[0].designation_id
              }
            }).then(deg_users =>{
              console.log("****done degination****")

              tblemployeedepartments.findAll({
                where:{
                  id:l_users[0].department_id
                }
              }).then(dept_users =>{
                console.log("****done department****")

                id_ltrack=[]
                for(i=0 ;i<10 ; i++){
                  id_ltrack.push(a_users[i].absent_type)
                }
                tblhrmemployeeleavetrack.findAll({
                  where:{
                    id:id_ltrack
                  }
                }).then(ltrack_users =>{
                  console.log("****done leave track****")
                   list=[]
                      for(i=0;i<10;i++){
                        if(a_users[i].attendance_type==1 || a_users[i].attendance_type==3){
                          duty_Hour=((new Date(a_users[i].checkout_time)*0.001)/60)/60-((new Date(a_users[i].checkin_time)*0.001)/60)/60
                        }else {
                          duty_Hour="0.0"
                        }
                        if(a_users[i].emp_id !=null){
                          grab_id=l_users[0].grab_id
                        }
                        else {
                          grab_id="NA"
                        }
                        if(a_users[i].emp_id !=null){
                          emp_name=`${l_users[0].employee_firstname} ${l_users[0].employee_lastname}`
                        }
                        if (deg_users[0].designation_name !=null) {
                          degination=deg_users[0].designation_name
                        }
                        else{
                          degination="NA"
                        }
                        if (dept_users[0].department_name != null) {
                          department=dept_users[0].department_name
                        }
                        else{
                          department="NA"
                        }
                        if(a_users[i].city_id !=null){
                          city_id=a_users[i].city_id
                        }
                        else{
                          city_id="NA"
                        }
                        if (a_users[i].checkin_time !=0) {
                          checkin_time=a_users[i].checkin_time
                        }
                        else {
                          checkin_time="NA"
                        }
                        if (a_users[i].checkout_time !=0) {
                          checkout_time=a_users[i].checkout_time
                        }
                        else {
                          checkout_time="NA"
                        }
                        if (a_users[i].attendance_type !=null) {
                          attendance_type=a_users[i].attendance_type
                        }
                        else {
                          attendance_type="NA"
                        }
                        if (a_users[i].absent_type !=null) {
                          leave_type=a_users[i].absent_type
                        }
                        else {
                          leave_type="Na"
                        }
                        if (l_users[0].status != null) {
                          status=l_users[0].status
                        }
                        else {
                          status="NA"
                        }
                        if (a_users[i].comments !='') {
                          comments=a_users[i].comments
                        }
                        else {
                          comments=''
                        }
                        if (duty_Hour>1) {
                          duty_Hour=duty_Hour+" hrs"
                        }
                        else {
                          duty_Hour=duty_Hour+" hr"
                        }
                        date1=new Date(a_users[i].date)
                        dated=date1.getUTCDate()
                        datem=date1.getUTCMonth()
                        datey=date1.getUTCFullYear()
                        date=`${dated}-${datem}-${datey}`
                      list.push({id:a_users[i].id,emp_id:a_users[i].emp_id,city_id:city_id,date:date,checkin_time:checkin_time,checkout_time:checkout_time,attendance_type:attendance_type,absent_id:a_users[i].absent_type,comments:comments,attendance_id:a_users[i].id,hrm_mode:2,grab_id:grab_id,emp_name:emp_name,designation:degination,leave_type:leave_type,status:status,duty_hour:duty_Hour,department:department})
                    }
                    res.json(list);
                })
              })
           })
          })
        });
      }


}

//l_users[0].department_id


/*exports.userAttendance = (req, res, next) => {
        tblhrmdailyrosterattendance = tblhrmdailyrosterattendance(sequalize, Sequalize)
        tblhrmdailyrosterattendance.findAll({
          where:{
          emp_id:req.body.Emp_Id
    },
          offset:(req.body.Page_No-1)*20,limit:20,
      }).then(users => {
        list=[]
          for(i=0;i<20;i++){
          list.push({id:users[i].id,emp_id:users[i].emp_id,date:users[i].date,checkin_time:users[i].checkin_time,checkout_time:users[i].checkout_time,attendance_type:users[i].attendance_type,absent_type:users[i].absent_type,comments:users[i].comments,duty_hour:new Date(users[i].checkin_time).getHours()-new Date(users[i].checkout_time).getHours()})

        }
          res.json(list);

        });
}*/
