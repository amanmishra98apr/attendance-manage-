var tblBackendUsers = require("../models/tbl_backend_users")
var tblhrmemployeeleaves = require("../models/tbl_hrm_employee_leaves")
const sequalize = require("../common/dbconfig").sequelize;
const Sequalize = require("sequelize");

exports.userProfile = (req, res, next) => {
    tblBackendUsers = tblBackendUsers(sequalize, Sequalize)
    tblBackendUsers.findAll({
      limit: 10
  }).then(users => {
      res.json(users);
    });
  }

exports.userLeaves = (req, res, next) => {
        tblhrmemployeeleaves = tblhrmemployeeleaves(sequalize, Sequalize)
        tblhrmemployeeleaves.findAll({
          attributes:['id','emp_id','city_id','leave_type',
                      'total_leaves','carry_forwaded_leaves','eligible_leaves',
          'temp_used_leaves','main_used_leaves','temp_pending_leaves',
          'main_pending_leaves','lapsed_leaves','leave_year','active'],
          where:{
          id:req.body.id
    }
      }).then(users => {
          res.json(users);

        });

      }
