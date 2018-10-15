var express = require('express');
var router = express.Router();
var Ticket = require('../models/Ticket');

router.get('/:id?', function (req, res, next) {

	if (req.params.id && !isNaN(req.params.id) ) {

		Ticket.getTicketById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			}
			else {
				if(rows[0] != undefined)
					res.json(rows[0]);
				else
					res.json(null);
			}
		});
	}
	else if(req.params.id == "lala") { // Algum metodo especifico
		res.json("lala");
	}
	else {

		Ticket.getAllTickets(function (err, rows) {

			if (err) {
				res.json(err);
			}
			else {
				res.json(rows);
			}

		});
	}
});
router.post('/', function (req, res, next) {

	Ticket.addTicket(req.body, function (err, count) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(req.body);//or return count for 1 &amp;amp;amp; 0
		}
	});
});
router.delete('/:id', function (req, res, next) {
	Ticket.deleteTicket(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	Ticket.updateTicket(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(rows);
		}
	});
});
module.exports = router;