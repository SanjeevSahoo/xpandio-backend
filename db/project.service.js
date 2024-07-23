const ProjectServiceMySql = require("./mysqldb/project.service");
const ProjectServiceOracle = require("./oracledb/project.service");
const { BASE_DB_TYPE } = require("../configs/common");

const ProjectService =
  BASE_DB_TYPE === "mysqldb" ? ProjectServiceMySql : ProjectServiceOracle;

module.exports = ProjectService;
