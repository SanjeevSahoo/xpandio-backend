const AuthServiceMySql = require("./mysqldb/auth.service");
const AuthServiceOracle = require("./oracledb/auth.service");
const { BASE_DB_TYPE } = require("../configs/common");

const AuthService =
  BASE_DB_TYPE === "mysqldb" ? AuthServiceMySql : AuthServiceOracle;

module.exports = AuthService;
