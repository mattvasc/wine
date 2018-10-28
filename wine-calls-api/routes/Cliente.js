var express = require('express');
var router = express.Router();
const Model = require('../model');
router.get('/:id?', function (req, res, next) {

	if (req.params.id && !isNaN(req.params.id) ) {
		//Model.client
		
	}
	else if(req.params.id == "lala") { 
		
	}
	else if (req.params.id === undefined) {

		Model.cliente.findAll().then(response => res.json(response)); 
	} else {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	}
});
router.post('/', function (req, res, next) {

	let temp = Model.cliente.build(req.body);
	temp.save().then(res.json(temp));

});
router.delete('/:id', function (req, res, next) {
	Client.deleteClient(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	Client.updateClient(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(rows);
		}
	});
});
module.exports = router;