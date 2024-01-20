const { createSquliteDatabaseConnection } = require("../middleware/dbConnection");
const GenerateTicketData = require("./generateTicket");

const GenerateTicket = async (req, res) => {
  const sets = parseInt(req.params.sets)
  let connection;
  const ticketsToBeInserted = []
  const insertedIds = [];
  const insertQuery = `INSERT INTO tambola_ticket (ticket_data) VALUES (?)`

  try {
    connection = await createSquliteDatabaseConnection()

    for (let i = 0; i < sets; i++) {
      console.log("before : ", Date.now(), i);
      let isUnique = true

      while (isUnique) {
        const myTicket = GenerateTicketData()
        ticketsToBeInserted.push(myTicket)
        const availableTicket = await connection.get('SELECT * FROM tambola_ticket WHERE ticket_data = ?', [JSON.stringify(myTicket)]);

        if (!availableTicket) {
          await connection.run(insertQuery, [JSON.stringify(myTicket)]) 
            .then((res) => {
              insertedIds.push(res.lastID)
              console.log("new ticket inserted with id " + res.lastID);
              isUnique = false
            })
            .catch((err) => {
              console.log("error occured while inserting ", err);
            })

        }

      }

      console.log("after : ", Date.now(), insertedIds.join("=="));

    }
    res.status(200).json({ status: "success", message: `Ticket/Tickets has been generated with IDs: ${insertedIds.join(",")}`, insertedIds: insertedIds });

  } catch (error) {
    console.log("error while inserting tickets ", error);
    res.status(500).json({ status: "failed", message: `Internal server Error :${error.message}` });
  }
  finally {
    console.log("");
    await connection.close()

  }
}

const GetTickets = async (req, res) => {
  const page = +req.query.page || 1;
  const pageSize = +req.query.limit || 10;
  const offset = (page - 1) * pageSize;
  let connection;
  console.log("getting tickets");
  try {
    connection = await createSquliteDatabaseConnection()
    const tickets = await connection.all(
      `
      SELECT *
      FROM  tambola_ticket
      LIMIT ${pageSize} OFFSET ${offset};
    `
    );
    const numberOfTickets = await connection.get(
      `
      SELECT count(*) as count
      FROM  tambola_ticket;
    `
    );
    const availableTickets = []
    for (const ticket of tickets) {
      const obj = {}
      obj[ticket.id] = JSON.parse(ticket.ticket_data)
      availableTickets.push(obj)
    }
    const response = {
      tickets: availableTickets,
      totalTickets: numberOfTickets.count,
      currentPage: page,
      ticketOnPage: availableTickets.length
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: `Error occured while getting tickets: ${error.message}`
    })
  }
  finally {
    console.log("closing db connection");
    connection.close()
  }



}

const GetTicketById = async (req, res) => {
  const ticketId = +req.params.id;
  console.log("getting ticket by id");
  try {
    connection = await createSquliteDatabaseConnection()
    const ticketDetails = await connection.get(
      `
      SELECT *
      FROM  tambola_ticket
      WHERE id=${ticketId};
    `
    );

    if(ticketDetails){
          res.status(200).json({
      status : "success",
      message: `Ticket details fetched successfully.`,
      data: ticketDetails
    })
    }
    else{
      res.status(400).json({
        status : "failed",
        message: `Invalid ticket id ${ticketId}`,
        data: ticketDetails
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: `Error occured while getting tickets: ${error.message}`
    })
  }
  finally {
    connection.close()
  }



}


module.exports = { GenerateTicket, GetTickets, GetTicketById } 