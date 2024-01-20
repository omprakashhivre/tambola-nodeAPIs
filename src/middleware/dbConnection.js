const { createConnection } = require('typeorm');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// mysql database connection
const createMysqlDatabaseConnection = async () => {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Ticket],
    synchronize: true,
    logging: true,
  });

  return connection;
};

// sequlite db connection
async function createSquliteDatabaseConnection() {
  const db = await open({
      filename: 'tambola.db',
      driver: sqlite3.Database,
  });

  await db.exec(`
  CREATE TABLE IF NOT EXISTS tambola_ticket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_data TEXT NOT NULL UNIQUE
  )
`);

return db; 
}



module.exports = {createSquliteDatabaseConnection};
