const oracledb = require("oracledb");
const dbConfig = require("../configs/database.js");
const logger = require("../utils/logger.js");

async function initialize() {
  await oracledb.initOracleClient(dbConfig);
  //const pool = await oracledb.createPool(dbConfig);
  logger.log("info", "DB Initialized");
}

async function close() {
  //await oracledb.getPool().close();
  logger.log("info", "DB Pool Closed");
}

function simpleQuery(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      logger.log("info", "BEFORE DB Get Connection");
      conn = await oracledb.getConnection(dbConfig);
      //conn.callTimeout = 60 * 1000;
      logger.log("info", "BEFORE DB Execution");
      const result = await conn.execute(statement, binds, opts);
      logger.log("info", "AFTER DB Execution Success");
      resolve(result);
    } catch (err) {
      logger.log("error", `DB Execution, ${JSON.stringify(err)}`);
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          logger.log("info", "BEFORE DB Connection Close");
          await conn.close();
          logger.log("info", "AFTER DB Connection Close");
        } catch (err) {
          console.log(err);
          logger.log("error", `DB Connection Close, ${JSON.stringify(err)}`);
        }
      }
    }
  });
}

function insertManyQuery(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection(dbConfig);

      const result = await conn.executeMany(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleQuery = simpleQuery;
module.exports.insertManyQuery = insertManyQuery;

module.exports.close = close;

module.exports.initialize = initialize;
