const { simpleQuery } = require("./connection");

exports.authenticateUser = async (username, password) => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: { _id: "", email: "", emp_id: "", designation: "", name: "" },
  };

  try {
    let resultUsers = await simpleQuery(
      `SELECT  
          id "_id",          
          email "email",
          emp_id "emp_id",      
          IFNULL(designation, 'User') "designation",    
          name "name"
        FROM
            t_frm_users t1
        WHERE
              t1.sap_status = 'Active'
            AND t1.username = ?
            AND t1.password = ?
        ORDER BY t1.name ASC`,
      [username, password]
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: "DB Error",
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultUsers || resultUsers.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultUsers.errorMessage;
    } else {
      const currUsers = resultUsers;

      if (currUsers.length > 0) {
        retVal.data = { ...currUsers[0] };
      } else {
        retVal.error = true;
        retVal.errorMessage = "User Details not found";
      }
    }
  } catch (err) {
    console.log(err);
    retVal.error = true;
    retVal.errorMessage = "Unknown DB Error";
  }

  return retVal;
};

exports.getUserAllApps = async (userId) => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: [],
  };

  try {
    let resultApps = await simpleQuery(
      `SELECT  
          t1.id "id",
          t1.name "name",
          t1.stage "stage",
          t1.hosting_status "hosting_status",
          IFNULL(t1.hosting_url,'') "hosting_url",
          t1.disp_name "disp_name",
          t1.short_desc "short_desc",
          t1.logo_url "logo_url",
          t1.project_lead_id "project_lead_id",
          t1.creation_type "creation_type",
          IFNULL(t1.own_login_url,'') "own_login_url",
          t1.client_dept "client_dept",
          t1.client_spoc_id "client_spoc_id",
          t1.team_id "team_id",
          IFNULL(t1.project_admins,'') "project_admins",
          t1.status "status",
          t1.base_url "base_url"
        FROM
          t_exp_projects t1,
          t_exp_user_apps t2
        WHERE
              t1.status = 'Active'
            AND t1.creation_type = 'App' 
            AND t1.id = t2.project_id
            AND t2.user_id = ?
        ORDER BY t1.name ASC`,
      [userId]
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: "DB Error",
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultApps || resultApps.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultApps.errorMessage;
    } else {
      const currApps = resultApps;

      if (currApps.length > 0) {
        retVal.data = [...currApps];
      }
    }
  } catch (err) {
    console.log(err);
    retVal.error = true;
    retVal.errorMessage = "Unknown DB Error";
  }

  return retVal;
};
