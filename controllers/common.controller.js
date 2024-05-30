const oracledb = require("oracledb");
const database = require("../services/database.js");
const logger = require("../utils/logger.js");

// reusable functions

exports.getDBDate = async (req, res) => {
  logger.log("info", "PATH -------------- /get-db-date  ---------------");

  let resultCurrDate = await database
    .simpleQuery(
      `SELECT
          CASE WHEN TO_NUMBER(TO_CHAR(SYSDATE,'hh24')) BETWEEN 0 AND 6 THEN TO_CHAR(sysdate-1, 'YYYY-MM-DD') ELSE TO_CHAR(sysdate, 'YYYY-MM-DD') END CURR_DATE_TIME          
        FROM
          dual`,
      {}
    )
    .catch((err) => {
      return {
        errorMessage: "Oracle DB Error",
        errorTransKey: "api_res_oracle_db_error",
      };
    });

  if (!resultCurrDate || resultCurrDate.errorMessage || !resultCurrDate.rows) {
    return res.status(400).json({
      errorMessage: "DB Query Error. Try again",
      errorTransKey: "api_res_oracle_db_error",
    });
  }

  const currDate = resultCurrDate.rows[0].CURR_DATE_TIME;

  logger.log("info", "get-db-date success");

  res.status(200).json({
    currDate,
  });
};
