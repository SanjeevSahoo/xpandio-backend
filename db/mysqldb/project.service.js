const { simpleQuery } = require("./connection");

exports.getAllApps = async () => {
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
          t_exp_projects t1
        WHERE
              t1.status = 'Active'
            AND t1.creation_type = 'App'        
        ORDER BY t1.name ASC`,
      []
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

exports.getAllModules = async () => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: [],
  };

  try {
    let resultModules = await simpleQuery(
      `SELECT  
          t1.id "id",
          t1.project_id "project_id",
          t1.name "name",
          t1.disp_name "disp_name",
          t1.module_lead_id "module_lead_id",
          t1.client_spoc_id "client_spoc_id",
          t1.module_admins "module_admins",
          t1.logo_url "logo_url",
          t1.short_desc "short_desc",
          t1.status "status"
        FROM
          t_exp_project_modules t1
        WHERE
            t1.status = 'Active'     
        ORDER BY t1.name ASC`,
      []
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: "DB Error",
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultModules || resultModules.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultModules.errorMessage;
    } else {
      const currModules = resultModules;

      if (currModules.length > 0) {
        retVal.data = [...currModules];
      }
    }
  } catch (err) {
    console.log(err);
    retVal.error = true;
    retVal.errorMessage = "Unknown DB Error";
  }

  return retVal;
};

exports.getAllRoles = async (appId, moduleId) => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: [],
  };

  const sqlApp = appId !== "-1" ? ` AND t1.project_id = ${appId} ` : ``;
  const sqlModule = moduleId !== "-1" ? ` AND t1.module_id = ${moduleId} ` : ``;

  try {
    let resultRoles = await simpleQuery(
      `SELECT  
          t1.id "id",
          t1.name "name",
          t1.role_assign_auth "role_assign_auth",
          t1.status "status",
          t1.project_id "project_id",
          t1.module_id "module_id",
          t1.crt_by "crt_by",
          t1.crt_date "crt_date"
        FROM
          t_exp_roles t1
        WHERE
              1=1
          ${sqlApp}
          ${sqlModule}
        ORDER BY t1.name ASC`,
      []
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: "DB Error",
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultRoles || resultRoles.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultRoles.errorMessage;
    } else {
      const currRoles = resultRoles;

      if (currRoles.length > 0) {
        retVal.data = [...currRoles];
      } else {
        retVal.data = [];
      }
    }
  } catch (err) {
    console.log(err);
    retVal.error = true;
    retVal.errorMessage = "Unknown DB Error";
  }

  return retVal;
};
