const express = require('express');
const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const bodyParser = require("body-parser")
const PORT = process.env.PORT;
const cors = require('cors');
let db;
app.use(cors({ origin: true }));
const routes = require('./src/routes/routes')

async function initializeDatabase() {
    db = await open({
        filename: 'tambola.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_data TEXT NOT NULL UNIQUE
    )
  `);
}



app.use(bodyParser.json());
const jsonParser = bodyParser.json() 
app.use("/api/v1/tambola",jsonParser,  routes)





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
