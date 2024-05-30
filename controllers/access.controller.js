const oracledb = require("oracledb");
const database = require("../services/database.js");
const logger = require("../utils/logger.js");

exports.appaccess = async (req, res) => {
  logger.log("info", "PATH -------------- /appaccess  ---------------");
  const { ID } = req.user;

  let resultMenus = await database
    .simpleQuery(
      `SELECT DISTINCT
            t1.id,
            t1.name,
            t1.app_id,
            t1.mas_id
        FROM
            t_sdt_menus t1,
            t_sdt_role_menus t2,
            t_frm_user_role t3
        WHERE
                t1.id = t2.menu_id
            AND
                t2.role_id = t3.role_id
            AND
                t1.status = 'Active'
            AND
                t3.user_id =:logged_user_id`,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: ID,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (!resultMenus || resultMenus.errorMessage || !resultMenus.rows) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  let resultApps = await database
    .simpleQuery(
      `SELECT DISTINCT
            t1.id,
            t1.name,
            t1.sht_name,
            t1.app_desc,
            t1.logo_path
        FROM
            t_sdt_apps t1,
            t_sdt_menus t2,
            t_sdt_role_menus t3,
            t_frm_user_role t4
        WHERE
                t1.status = 'Active'
            AND
                t2.app_id = t1.id
            AND
                t2.status = 'Active'
            AND
                t3.menu_id = t2.id
            AND
                t4.role_id = t3.role_id
            AND
                t4.user_id = :logged_user_id
        ORDER BY t1.id ASC`,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: ID,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (!resultApps || resultApps.errorMessage || !resultApps.rows) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  let resultAdminAreas = await database
    .simpleQuery(
      ` SELECT
            t3.tol_level_id            
        FROM
            t_sdt_fic_admins t1,
            t_sos_ficdiv_map t2,
            t_sos_organisation_levels t3
        WHERE
                t1.member_id = :logged_user_id 
            AND
                t2.tfm_fic_id = t1.fic_id
            AND
                t2.tfm_act_flg = 'Active'
            AND
                t3.tol_mas_id = t2.tfm_div_id
            AND
                t3.tol_act_flg = 'Active' `,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: ID,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (
    !resultAdminAreas ||
    resultAdminAreas.errorMessage ||
    !resultAdminAreas.rows
  ) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  logger.log("info", "appaccess Success");
  res.status(200).json({
    menus: [...resultMenus.rows],
    apps: [...resultApps.rows],
    adminAreas: [...resultAdminAreas.rows.map((item) => +item.TOL_LEVEL_ID)],
    appId: 1,
  });
};

exports.getMenuAccess = async (req, res) => {
  logger.log("info", "PATH -------------- /get-menu-access  ---------------");
  const { ID } = req.user;
  const { menuId } = req.body;
  let hasAccess = false;
  let resultMenus = await database
    .simpleQuery(
      `SELECT t1.id
        FROM
            t_sdt_menus t1,
            t_sdt_role_menus t2,
            t_frm_user_role t3
        WHERE
                t1.id = t2.menu_id
            AND
                t2.role_id = t3.role_id
            AND
                t1.status = 'Active'
            AND
                t3.user_id =:logged_user_id
            AND
                t1.id = :curr_menu_id`,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: ID,
          type: oracledb.NUMBER,
        },
        curr_menu_id: {
          dir: oracledb.BIND_IN,
          val: menuId,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (!resultMenus || resultMenus.errorMessage || !resultMenus.rows) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  if (resultMenus.rows.length > 0) {
    hasAccess = true;
  }

  logger.log("info", "get menu access Success");
  res.status(200).json({
    hasAccess,
  });
};
