const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "funcionario_wine";

const router = geradorDeRotas(Model, entidade_nome);

var entidade = Model[entidade_nome];

const jwt = require('jsonwebtoken');


router.post('/login', (req, res) => {
	console.log(req.body);
	if (req.body.email !== undefined && req.body.senha !== undefined) {
		console.log(entidade);
		entidade.findOne({
			where: {
				email: req.body.email,
				senha: req.body.senha
			}
		})
		.then(retorno => {
			console.log(retorno);
			if(retorno !== null) {
				res.statusCode = 200;
				let token_claims = {
					user: retorno.nome, 
					email: retorno.email};
				let token = jwt.sign(token_claims, "shhhhh", { expiresIn: '15m' });

				res.json({success: true, data: token});

			} else{
				res.statusCode = 403;
				res.json({"success":false, "error":"Invalid Credentials"});
			}
			return;
		})
		.catch(error => {
			console.log(error);
			res.statusCode = 500;
			res.json({
				success: false,
				data: {},
				error: error
			})
		});
	} else {
		res.statusCode = 400;
		res.json("bad request");
	}
});


module.exports = router;