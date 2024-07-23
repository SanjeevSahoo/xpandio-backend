const { simpleQuery } = require("./connection");

exports.getLocations = async () => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: [],
  };

  try {
    let resultLocations = await simpleQuery(
      ` SELECT 
            id "id",
            locn_name "name" 
        FROM 
            locations 
        WHERE 
            act_flg = 'Active' 
        ORDER BY 
            id  ASC `,
      {},
      {},
      "health"
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: "DB Error",
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultLocations || resultLocations.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultLocations.errorMessage;
    } else {
      const currData = resultLocations.rows;

      if (currData.length > 0) {
        retVal.data = [...currData];
      } else {
        retVal.error = true;
        retVal.errorMessage = "Location not found";
      }
    }
  } catch (err) {
    console.log(err);
    retVal.error = true;
    retVal.errorMessage = "Unknown DB Error";
  }

  return retVal;
};

exports.getHealthIndexReport = async (fyear, locnId) => {
  let retVal = {
    error: false,
    errorMessage: "",
    data: [],
  };

  try {
    let resultHealthIndexReport = await simpleQuery(
      ` SELECT
            NVL(b.ticket_no,'') "ticket_no",
            NVL(b.emp_name,'') "emp_name",
            NVL(TO_CHAR(a.phs_dt,'DD-Mon-YYYY'),'') "test_date",
            NVL(a.tst_year,0) "tst_year",
            NVL(a.tst_cycle,0) "tst_cycle",
            NVL(b.gender,'') "gender",
            NVL(FLOOR(TO_NUMBER(TRUNC(SYSDATE)-TRUNC(b.dob))/365.25),0)  "age",
            NVL(b.height,0) "height",
            NVL(a.phs_weight,0) "phs_weight",
            NVL(c.tol_level_name,'') "div_name",
            NVL(a.phs_bmi,0) "phs_bmi",
            NVL(a.phs_bp,'') "phs_bp",
            NVL(a.phs_bps1,'') "phs_bps1",
            NVL(a.phs_bps2,'') "phs_bps2",
            NVL(TO_CHAR(a.test_ts,'DD-Mon-YYYY'),'') "log_test_date",
            NVL(a.emp_id,0) "emp_id"
        FROM
            mcs_emp_tests a
            LEFT JOIN mcs_organisation_levels c ON a.div_id = c.tol_level_id
            JOIN mcs_emp_master b ON a.emp_id=b.id
            LEFT OUTER JOIN mcs_emp_tests d  ON d.emp_id = a.emp_id and d.tst_year = a.tst_year - 1 and d.tst_cycle = 1
        WHERE
            a.tst_cycle!=0
            AND a.act_tests LIKE '%4%'
            AND a.sch_tests LIKE '%4%'
            AND a.locn_id=${locnId} AND a.tst_year=${fyear}
        `,
      {},
      {},
      "health"
    ).catch((err) => {
      console.log(err);
      return {
        errorMessage: `DB Error`,
        errorTransKey: "api_res_db_error",
      };
    });

    if (!resultHealthIndexReport || resultHealthIndexReport.errorMessage) {
      retVal.error = true;
      retVal.errorMessage = resultHealthIndexReport.errorMessage;
    } else {
      const currData = resultHealthIndexReport.rows;

      if (currData.length > 0) {
        retVal.data = [...currData];
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
