const AccessServiceMySql = require("./mysqldb/access.service");
const AccessServiceOracle = require("./oracledb/access.service");
const { BASE_DB_TYPE } = require("../configs/common");

const AccessService =
  BASE_DB_TYPE === "mysqldb" ? AccessServiceMySql : AccessServiceOracle;

module.exports = AccessService;
