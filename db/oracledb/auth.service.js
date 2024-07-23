const oracledb = require("oracledb");
const ldap = require("ldapjs");

const { LDAP_HOSTS, LDAP_HOSTS_TML } = require("../../configs/common");
const { simpleQuery } = require("./connection");

const authenticate = (ldapUrl, ldapDom, domainId, domainPassword) => {
  let client = ldap.createClient({
    url: ldapUrl,
  });

  return new Promise((resolve, reject) => {
    client.on("error", () => {
      reject(false);
    });

    client.bind(domainId + ldapDom, domainPassword, (err) => {
      if (err) {
        reject(false);
      }
      client.unbind();
      resolve(true);
    });
  });
};

exports.authenticateUser = async (username, password) => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: { _id: "", email: "", emp_id: "", designation: "", name: "" },
  };

  // LDAP authentication

  let isAuthenticated = false;
  if (LDAP_HOSTS.length > 0) {
    for (let i = 0; i < LDAP_HOSTS_TML.length; i++) {
      if (!isAuthenticated) {
        let isCurrAuthenticated = await authenticate(
          "ldap://" + LDAP_HOSTS_TML[i].url,
          LDAP_HOSTS_TML[i].dom,
          username,
          password
        )
          .then(() => {
            return true;
          })
          .catch((err) => {
            return false;
          });
        if (isCurrAuthenticated) {
          isAuthenticated = true;
        }
      }
    }
  }

  try {
    let resultUsers = await simpleQuery(
      `SELECT  
          id "_id",          
          email "email",
          emp_id "emp_id",   
          NVL(designation, 'User') "designation",       
          name "name",
          password "password"
        FROM
            t_frm_users t1
        WHERE
              t1.sap_status = 'Active'
            AND t1.username = :curr_username            
        ORDER BY t1.name ASC`,
      {
        curr_username: {
          dir: oracledb.BIND_IN,
          val: username,
          type: oracledb.STRING,
        },
      }
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
      const currUsers = resultUsers.rows;

      if (currUsers.length > 0) {
        // check if is not authenticated the compare with Bycrypt password

        if (!isAuthenticated) {
          isAuthenticated = resultUsers.rows[0].password === password;
          if (isAuthenticated) {
            retVal.error = false;
            retVal.data = {
              _id: currUsers[0]._id,
              name: currUsers[0].name,
              email: currUsers[0].email,
              emp_id: currUsers[0].emp_id,
              designation: currUsers[0].designation,
            };
          } else {
            retVal.error = true;
            retVal.errorMessage = "Invalid Credentials";
          }
        } else {
          retVal.error = false;
          retVal.data = {
            _id: currUsers[0]._id,
            name: currUsers[0].name,
            email: currUsers[0].email,
            emp_id: currUsers[0].emp_id,
            designation: currUsers[0].designation,
          };
        }
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
        t1.hosting_url "hosting_url",
        t1.disp_name "disp_name",
        t1.short_desc "short_desc",
        t1.logo_url "logo_url",
        t1.project_lead_id "project_lead_id",
        t1.creation_type "creation_type",
        t1.own_login_url "own_login_url",
        t1.client_dept "client_dept",
        t1.client_spoc_id "client_spoc_id",
        t1.team_id "team_id",
        t1.project_admins "project_admins",
        t1.status "status",
        t1.base_url "base_url"
      FROM
        t_exp_projects t1,
        t_exp_user_apps t2
      WHERE
            t1.status = 'Active'
          AND t1.creation_type = 'App' 
          AND t1.id = t2.project_id
          AND t2.user_id = :curr_user_id
      ORDER BY t1.name ASC`,
      {
        curr_user_id: {
          dir: oracledb.BIND_IN,
          val: userId,
          type: oracledb.NUMBER,
        },
      }
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
      const currApps = resultApps.rows;

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
