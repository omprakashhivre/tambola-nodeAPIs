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

// async function generateTambolaSet() {
//     const sampleTicket = [
//       [1, 0, 15, 0, 35, 0, 50, 65, 0],
//       [5, 0, 23, 0, 0, 54, 0, 76, 88],
//       [0, 12, 0, 0, 41, 0, 60, 72, 0],
//     ];

//     const ticketData = JSON.stringify(sampleTicket);

//     const [result] = await connection.execute(
//       'INSERT INTO tickets (ticket_data) VALUES (?)',
//       [ticketData]
//     );

//     const insertedTicketId = result.insertId;

//     return { [insertedTicketId]: sampleTicket };
//   }


// function generateTambolaSet(N) {
//     const tambolaSets = {};

//     // Helper function to check if a number exists in a column
//     function isNumberInColumn(column, num) {
//       return tambolaSets[column].some(ticket => ticket.includes(num));
//     }

//     // Helper function to generate a unique ticket
//     function generateTicket() {
//       const ticket = Array.from({ length: 3 }, () => Array(9).fill(0));

//       for (let col = 0; col < 9; col++) {
//         const columnNumbers = Array.from({ length: 10 }, (_, index) => col * 10 + index + 1);
//         columnNumbers.shift(); // Remove 0

//         // Ensure each column has at least 1 number
//         const randomIndex = Math.floor(Math.random() * ticket.length);
//         ticket[randomIndex][col] = columnNumbers.shift();

//         // Fill other rows in ascending order
//         for (let row = 0; row < ticket.length; row++) {
//           if (ticket[row][col] === 0) {
//             let nextNumber;
//             do {
//               nextNumber = columnNumbers.shift();
//             } while (isNumberInColumn(col, nextNumber));

//             ticket[row][col] = nextNumber;
//           }
//         }
//       }

//       return ticket;
//     }

//     for (let setNumber = 1; setNumber <= N; setNumber++) {
//       const tickets = [];
//       for (let ticketNumber = 1; ticketNumber <= 6; ticketNumber++) {
//         let uniqueTicket;
//         do {
//           uniqueTicket = generateTicket();
//         } while (tickets.some(existingTicket => JSON.stringify(existingTicket) === JSON.stringify(uniqueTicket)));

//         tickets.push(uniqueTicket);
//       }
//       tambolaSets[setNumber] = tickets;
//     }

//     console.log(tambolaSets);
//     return { tickets: tambolaSets };
//   }



app.use(bodyParser.json());
const jsonParser = bodyParser.json() 
app.use("/api/v1/tambola",  routes)



function generateTambolaTicket() {
    const ticket = Array.from({ length: 3 }, () => Array.from({ length: 9 }, () => 0));

    const columnNumbers = Array.from({ length: 9 }, (_, index) => Array.from({ length: 3 }, (_, rowIndex) => (index + 1) + rowIndex * 10));

    columnNumbers.forEach((column, colIndex) => {
        const nonZeroCount = Math.floor(Math.random() * 5) + 1; // Randomly choose 1 to 5 non-zero values
        const nonZeroIndexes = getRandomIndexes(3, nonZeroCount); // Get random indexes for non-zero values

        nonZeroIndexes.forEach((rowIndex, j) => {
            const num = column[j];
            ticket[rowIndex][colIndex] = num;
        });
    });

    return ticket;
}

function getRandomIndexes(max, count) {
    const indexes = Array.from({ length: max }, (_, i) => i);
    for (let i = max - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.slice(0, count);
}

app.post('/generate/:sets', async (req, res) => {
    let { sets } = req.params;
    sets = +sets
    console.log(sets);
    await initializeDatabase();

    const generatedSets = [];
    for (let i = 0; i < sets; i++) {
        const ticketSet = generateTambolaTicket();
        generatedSets.push(ticketSet);
    }

    res.json({ tickets: generatedSets });
});

app.get('/tickets', async (req, res) => {
    await initializeDatabase();

    const page = req.query.page || 1;
    const pageSize = 10;

    const offset = (page - 1) * pageSize;

    const tickets = await db.all(
        'SELECT * FROM tickets LIMIT ? OFFSET ?',
        pageSize,
        offset
    );

    res.json({ tickets });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
