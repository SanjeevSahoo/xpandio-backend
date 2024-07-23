const { mysql2 } = require("mysql2/promise");

const DB_CONFIG = {
  host: process.env.NODE_BASE_MYSQLDB_HOST,
  user: process.env.NODE_BASE_MYSQLDB_USER,
  password: process.env.NODE_BASE_MYSQLDB_PASSWORD,
  database: process.env.NODE_BASE_MYSQLDB_DATABASE,
  namedPlaceholders: true,
};

exports.simpleQuery = (statement, binds = []) => {
  return new Promise(async (resolve, reject) => {
    let conn;

    try {
      conn = await mysql2.createConnection(DB_CONFIG);
      const [rows] = await conn.execute(statement, binds);
      resolve(JSON.parse(JSON.stringify(rows)));
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.end();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
};
