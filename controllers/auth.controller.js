const oracledb = require("oracledb");
const database = require("../services/database.js");
const jwtGenerator = require("../utils/jwt");

const ldap = require("ldapjs");
const logger = require("../utils/logger.js");
const bcrypt = require("bcrypt");
const { decryptData, encryptData } = require("../utils/crypto.js");

const LDAP_HOSTS_TML = [];

exports.refreshToken = async (req, res) => {
  logger.log("info", "PATH -------------- /refreshtoken  ---------------");
  const { token } = req.body;
  if (!token) {
    return res.status(401).send({
      errorMessage: "Invalid Token",
      errorTransKey: "api_res_invalid_token",
    });
  }

  try {
    const verifiedWithoutExpiry = jwtGenerator.vertifyAccessToken(token, true);
    if (
      !verifiedWithoutExpiry ||
      !verifiedWithoutExpiry.ID ||
      !verifiedWithoutExpiry.exp
    ) {
      return res.status(401).send({
        errorMessage: "Invalid Token",
        errorTransKey: "api_res_invalid_token",
      });
    }

    const userDetails = {
      ID: verifiedWithoutExpiry.ID,
      NAME: verifiedWithoutExpiry.NAME,
      ROLES: verifiedWithoutExpiry.ROLES,
      TICKET_NO: verifiedWithoutExpiry.TICKET_NO,
      BASE_LOCN_ID: verifiedWithoutExpiry.BASE_LOCN_ID,
      PHOTO_PATH: verifiedWithoutExpiry.PHOTO_PATH,
    };

    const jsontoken = jwtGenerator.generateAccessToken(userDetails);

    res.status(200).send({ AUTH_TOKEN: jsontoken });
  } catch (err) {
    console.log(err);
    logger.log("error", `Refresh Token ${JSON.stringify(err)}`);
    return res.status(401).send({
      errorMessage: "Invalid Token",
      errorTransKey: "api_res_invalid_token",
    });
  }
};

function authenticate(ldapUrl, ldapDom, domainId, domainPassword) {
  let client = ldap.createClient({
    url: ldapUrl,
  });

  return new Promise((resolve, reject) => {
    client.on("error", (err) => {
      logger.log(
        "error",
        `Autenticate Bind Client ${ldapUrl}, ${JSON.stringify(err)}`
      );
      reject(false);
    });

    client.bind(domainId + ldapDom, domainPassword, (err) => {
      if (err) {
        logger.log(
          "error",
          `Autenticate Bind ${ldapUrl}, ${JSON.stringify(err)}`
        );
        reject(false);
      }
      client.unbind();
      logger.log("info", `Autenticate Bind  Success ${ldapUrl}`);
      resolve(true);
    });
  });
}

exports.login = async (req, res) => {
  logger.log("info", "PATH -------------- /login  ---------------");
  const { loginType, scannedText, domainId, domainPassword } = req.body;
  let result;
  let isAuthenticated = false;

  if (!loginType || !["Domain", "Scanner"].includes(loginType)) {
    return res.status(400).json({
      errorMessage: "Invalid authentication request. Try again.",
      errorTransKey: "api_res_invalid_auth_request",
    });
  }

  if (loginType === "Scanner") {
    if (!scannedText || scannedText.length <= 0) {
      return res.status(400).json({
        errorMessage: "Invalid Id is scanned. Try again.",
        errorTransKey: "api_res_invalid_id_scanned",
      });
    }

    result = await database
      .simpleQuery(
        `SELECT
            id,
            username domain_id,
            initcap(name) name,
            emp_id ticket_no,
            email email_id,
            profile_pic_url photo_path,
            base_loc base_locn_id,
            logged_in
        FROM
            t_frm_users
        WHERE
            sap_status = 'Active'
          AND
            rfid =:scanned_id`,
        {
          scanned_id: {
            dir: oracledb.BIND_IN,
            val: scannedText,
            type: oracledb.STRING,
          },
        }
      )
      .catch((err) => {
        return {
          errorMessage: "Oracle DB Error",
          errorTransKey: "api_res_oracle_db_error",
        };
      });
  } else {
    const decDomainId = decryptData(domainId);
    const decDomainPassword = decryptData(domainPassword);

    if (!decDomainId || decDomainId.length <= 0) {
      return res.status(400).json({
        errorMessage: "Domain Id cannot be blank. Try again.",
        errorTransKey: "api_res_domainid_blank",
      });
    }

    if (!decDomainPassword || decDomainPassword.length <= 0) {
      return res.status(400).json({
        errorMessage: "Domain Password cannot be blank. Try again.",
        errorTransKey: "api_res_password_blank",
      });
    }

    // LDAP authentication

    for (let i = 0; i < LDAP_HOSTS_TML.length; i++) {
      if (!isAuthenticated) {
        let isCurrAuthenticated = await authenticate(
          "ldap://" + LDAP_HOSTS_TML[i].url,
          LDAP_HOSTS_TML[i].dom,
          decDomainId,
          decDomainPassword
        )
          .then(() => {
            logger.log("info", "Autentication Success");
            return true;
          })
          .catch((err) => {
            logger.log("error", `Autentication Failed ${JSON.stringify(err)}`);
            return false;
          });
        if (isCurrAuthenticated) {
          isAuthenticated = true;
        }
      }
    }

    result = await database
      .simpleQuery(
        `SELECT
            id,
            username domain_id,
            initcap(name) name,
            emp_id ticket_no,
            email email_id,
            profile_pic_url photo_path,
            base_loc base_locn_id,
            password,
            logged_in
        FROM
            t_frm_users
        WHERE
            sap_status <> 'Inactive'
          AND
            allowed_domain_login = 1
          AND
            username =:domain_id
          `,
        {
          domain_id: {
            dir: oracledb.BIND_IN,
            val: decDomainId,
            type: oracledb.STRING,
          },
        }
      )
      .catch((err) => {
        console.log(err);
        return {
          errorMessage: "Oracle DB Error",
          errorTransKey: "api_res_oracle_db_error",
        };
      });

    // check if is not authenticated the compare with Bycrypt password

    if (!isAuthenticated) {
      isAuthenticated = await bcrypt
        .compare(decDomainPassword, result.rows[0].PASSWORD)
        .then((hash) => {
          return hash;
        })
        .catch((err) => {
          console.error(err.message);
          return false;
        });

      if (!isAuthenticated) {
        return res.status(400).json({
          errorMessage: "Invalid Credentials. Try again",
          errorTransKey: "api_res_auth_invalid_credentials",
        });
      }
    }
  }

  if (!result || result.errorMessage || !result.rows) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  if (result.rows.length <= 0 || !result.rows[0].ID || result.rows[0].ID <= 0) {
    return res.status(400).json({
      errorMessage: "Invalid Credentials. Try again",
      errorTransKey: "api_res_auth_invalid_credentials",
    });
  }

  const userFound = result.rows[0];
  // console.log(userFound);
  if (userFound.LOGGED_IN !== 1) {
    const updateLoggdInStatus = await database
      .simpleQuery(
        `update t_frm_users set logged_in=1 where emp_id=:curr_emp_id`,
        {
          curr_emp_id: {
            dir: oracledb.BIND_IN,
            val: userFound.TICKET_NO,
            type: oracledb.STRING,
          },
        }
      )
      .catch((err) => {
        return {
          errorMessage: "Oracle DB Error",
          errorTransKey: "api_res_oracle_db_error",
        };
      });
  }

  // find User sdt team

  const resultUserSdtTeam = await database
    .simpleQuery(
      `SELECT
            t2.id teamid
        FROM
            t_sdt_team_member t1,
            t_sdt_team_master t2
        WHERE
                t1.member_id =:logged_user_id
            AND
                t1.team_id = t2.id
            AND
                SYSDATE BETWEEN t1.effect_from AND t1.effect_to
        UNION
        SELECT DISTINCT
          t4.id teamid
      FROM
          t_sdt_fic_admins t1,
          t_sos_ficdiv_map t2,
          t_sos_organisation_levels t3,
          t_sdt_team_master t4
      WHERE
              t1.member_id =:logged_user_id
          AND
              t1.fic_id = t2.tfm_fic_id
          AND
              t2.tfm_act_flg = 'Active'
          AND
              t3.tol_mas_id = t2.tfm_div_id
          AND
              t3.tol_act_flg = 'Active'
          AND
              t3.tol_level_id = t4.area_id
          AND
              t4.status = 'Active'
        UNION
        SELECT
            t4.id teamid
        FROM
            t_sos_organisation_levels t1,
            t_frm_users t2,
            t_sos_organisation_levels t3,
            t_sdt_team_master t4
        WHERE
                t1.tol_has_head = t2.emp_id
            AND
                t2.id =:logged_user_id
            AND
                t1.tol_level = 2
            AND
                t1.tol_act_flg = 'Active'
            AND
                t1.tol_level_id = t3.tol_mas_id
            AND
                t3.tol_level_id = t4.area_id
        UNION
        SELECT DISTINCT
            t5.id teamid
        FROM
            t_stp_factory t1,
            t_frm_users t2,
            t_sos_ficdiv_map t3,
            t_sos_organisation_levels t4,
            t_sdt_team_master t5
        WHERE
                t1.tfy_head = t2.emp_id
            AND
                t2.id =:logged_user_id
            AND
                t1.tfy_act_flg = 'Active'
            AND
                t3.tfm_fic_id = t1.tfy_fac_id
            AND
                t3.tfm_div_id = t4.tol_mas_id
            AND
                t5.area_id = t4.tol_level_id
        UNION
        SELECT DISTINCT
              t3.id teamid
            FROM
              t_frm_users t1,
              t_sos_organisation_levels t2,
              t_sdt_team_master t3
            WHERE
                  t1.id =:logged_user_id
              AND
                  t1.emp_id = t2.tol_has_head
              AND
                  t2.tol_level_id = t3.area_id
              AND
                  t2.tol_level = 3
              AND
                  t3.status = 'Active'
              AND
                  t2.tol_act_flg = 'Active'
              AND
                  t1.sap_status != 'Inactive'`,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: userFound.ID,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      console.log(err);
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (
    !resultUserSdtTeam ||
    resultUserSdtTeam.errorMessage ||
    !resultUserSdtTeam.rows
  ) {
    return res.status(400).json({
      errorMessage:
        "User found. But DB Query Error finding sdt team. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  let sdtTeamRows = [];

  if (resultUserSdtTeam.rows.length > 0) {
    sdtTeamRows = [...resultUserSdtTeam.rows.map((item) => item.TEAMID)];
  }

  // find users roles

  const resultRoles = await database
    .simpleQuery(
      `SELECT role_id FROM t_frm_user_role WHERE user_id = :found_user_id`,
      {
        found_user_id: {
          dir: oracledb.BIND_IN,
          val: userFound.ID,
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

  if (!resultRoles || resultRoles.errorMessage || !resultRoles.rows) {
    return res.status(400).json({
      errorMessage: "User found. But DB Query Error finding roles. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  if (resultRoles.rows.length <= 0) {
    return res.status(400).json({
      errorMessage: "User found. But no roles found.",
      errorTransKey: "api_res_auth_noroles",
    });
  }

  const roleRows = resultRoles.rows.map((item) => item.ROLE_ID);

  //check if user exists in any team
  const getUserCurrTeam = await database
    .simpleQuery(
      `SELECT
          TEAM_ID
      FROM
          t_sdt_team_member
      WHERE
              member_id = :logged_user_id
          AND
              SYSDATE BETWEEN effect_from AND effect_to`,
      {
        logged_user_id: {
          dir: oracledb.BIND_IN,
          val: userFound.ID,
          type: oracledb.NUMBER,
        },
      }
    )
    .catch((err) => {
      console.log(err);
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (
    !getUserCurrTeam ||
    getUserCurrTeam.errorMessage ||
    !getUserCurrTeam.rows
  ) {
    return res.status(400).json({
      errorMessage: "DB Query Error finding user current team. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  const isTeamMember = getUserCurrTeam.rows.length > 0 ? "Yes" : "No";
  const userDetails = {
    ID: userFound.ID,
    NAME: userFound.NAME,
    ROLES: roleRows,
    TICKET_NO: userFound.TICKET_NO,
    BASE_LOCN_ID: userFound.BASE_LOCN_ID,
    PHOTO_PATH: userFound.PHOTO_PATH,
    LOGGED_IN: userFound.LOGGED_IN,
    SDT_TEAM_LIST: sdtTeamRows,
    IS_TEAM_MEMBER: isTeamMember,
  };

  const jsontoken = jwtGenerator.generateAccessToken(userDetails);
  const encryptUserData = encryptData(JSON.stringify(userDetails));
  //console.log(encryptUserData);
  logger.log("info", "Login Successfull");
  res.status(200).json({ userData: encryptUserData, authToken: jsontoken });
};

exports.logout = async (req, res) => {
  const { ticketNo } = req.body;

  let updateUserStatus = await database
    .simpleQuery(
      `update t_frm_users set logged_in=0 where emp_id = '${ticketNo}'`
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (!updateUserStatus || updateUserStatus.errorMessage) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }
  return res.status(200).json("success");
};

exports.logoutConcurrentLogin = async (req, res) => {
  const { ticketNo } = req.body;
  let socketio = req.app.get("socketio");
  if (socketio) {
    socketio.emit(
      "NEW_LOGIN",
      JSON.stringify({
        ticketNo: ticketNo,
      })
    );
  }
  return res.status(200).json("success");
};
