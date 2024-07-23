const oracledb = require("oracledb");

const DB_CONFIG = {
  user: process.env.NODE_BASE_ORACLEDB_USER,
  password: process.env.NODE_BASE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_BASE_ORACLEDB_URL,
};

const DB_CONFIG_OHP = {
  user: process.env.NODE_BASE_ORACLEDB_OHP_USER,
  password: process.env.NODE_BASE_ORACLEDB_OHP_PASSWORD,
  connectString: process.env.NODE_BASE_ORACLEDB_OHP_URL,
};

exports.simpleQuery = (statement, binds = [], opts = {}, db = "frm") => {
  return new Promise(async (resolve, reject) => {
    let config = { ...DB_CONFIG };
    if (db === "health") {
      config = { ...DB_CONFIG_OHP };
      config.password += "#";
    }

    await oracledb.initOracleClient();
    let conn;

    opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection(config);
      const result = await conn.execute(statement, binds, opts);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
};
