const express = require('express');
const { GenerateTicket, GetTickets, GetTicketById } = require('../controller/ticketController');
const router = express.Router();



router.post("/generatetickets/:sets" , GenerateTicket)
router.get("/gettickets" , GetTickets)
router.get("/getticket/:id" , GetTicketById)


module.exports = router


