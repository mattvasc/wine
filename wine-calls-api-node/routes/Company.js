var express = require('express');
var router = express.Router();
var Company = require('../models/Company');

router.get('/:id?', function (req, res, next) {

	if (req.params.id) {

		Company.getCompanyByCNPJ(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			}
			else {
				res.json(rows);
			}
		});
	}
	else {

		Company.getAllCompanies(function (err, rows) {

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

	Company.addCompany(req.body, function (err, count) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(req.body);//or return count for 1 &amp;amp;amp; 0
		}
	});
});
router.delete('/:id', function (req, res, next) {

	Company.deleteCompany(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	Company.updateCompany(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(rows);
		}
	});
});
module.exports = router;