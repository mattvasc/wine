var db = require('../dbconnection'); //reference of dbconnection.js

var Ticket = {

	getAllTickets: function (callback) {

		return db.query("Select * from ticket", callback);

	},
	getTicketById: function (id, callback) {

		return db.query("select * from ticket where id=?", [id], callback);
	},
	addTicket: function (Ticket, callback) {
		return db.query("Insert into ticket values(?,?,?,?,?,?,?,?,?)", [Ticket.id, Ticket.clientId, Ticket.technicianId, Ticket.clientTicketId, hora_atual, Ticket.description, Ticket.clientPrice, Ticket.technicianPrice, Ticket.statusId], callback);
	

	},
	deleteTicket: function (id, callback) {
		return db.query("delete from ticket where id=?", [id], callback);
	},
	updateTicket: function (id, Ticket, callback) {
		return db.query("update ticket set name=?, email=? where id=?", [Ticket.name, Ticket.email, id], callback);
	}

};
module.exports = Ticket;