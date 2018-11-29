
const Sequelize = require('sequelize');
const formidable = require('formidable')
const path = require('path')
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', function (req, res) {
	res.json("Rota de testes");
});

router.get('/jwt/create', function (req, res) {
	var token = jwt.sign({ foo: 'bar' /*userid: xxx, nome: yyy*/}, 'asdfsdf', { expiresIn: '150s' });
	res.json(token);
});

router.get('/jwt/decode', function (req, res) {
	var token = req.query.token;
	res.json(jwt.decode(token));
	
});

router.get('/jwt/verify', function (req, res) {
	var token = req.query.token;

	res.json(jwt.verify(token, 'asdfsdf'));
});

module.exports = router;
