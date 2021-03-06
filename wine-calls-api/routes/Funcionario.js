const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "funcionario_wine";
const Util = require('../Util');
let quais_rotas_criar = {
	"single": false,
	"all": false,
	"paginacao": true,
	"describe": false,
	"create": false,
	"update": true,
	"delete": true
}


const router = geradorDeRotas(Model, entidade_nome, quais_rotas_criar);

var entidade = Model[entidade_nome];

const jwt = require('jsonwebtoken');

// Get todos, mas sem senha
router.get('/', (req, res) => { 
	console.log(`Indo pegar todos @s ${entidade_nome}`);
			entidade.findAll({attributes: ['id','nome','email','admin']}).then(result => {
				let temp = {
					success: true, data: {}
				};
				temp["data"][entidade_nome] = result;
				console.log(`Deu boa, retornando...`);
				res.json(temp);
			})
				.catch(error => res.json({
					success: false,
					data: {},
					error: error
				}));
});



router.get('/vazio', (req, res) => {
	entidade.count().then(c => {
		res.statusCode = 200;
		let resp = { success: true, data: (c > 0) ? false : true }
		res.json(resp);
	}).catch(error => {
		console.log(error);
		res.statusCode = 500;
		res.json({
			success: false,
			data: {},
			error: error
		})
	});
});

async function criarNovoFunc(func) {

}

// Adicionar novos funcionários, estando já logado
// requer JWT
router.post('/', (req, res) => {
	let temp = entidade.build(req.body);
	temp.senha = Util.saltHashPassword(temp.senha);
	temp.save()
		.then(payload => {
			let temp = {
				success: true,
				data: {}
			};
			delete payload.senha;
			delete payload['senha'];
			temp["data"][entidade_nome] = payload;
			res.statusCode = 200;
			res.json(temp);

		})
		.catch(error => {
			console.log(error);
			res.statusCode = 500;
			res.json(
				{
					success: false,
					data: {},
					error: error
				});
		});
});

// Adiciona o primeiro funcionario
// não requer JWT
router.post('/first', (req, res) => {
	let resp = {};
	entidade.count().then(c => {
		if (c == 0) {
			let temp = entidade.build(req.body);
			temp.senha = Util.saltHashPassword(temp.senha);
			temp.save()
				.then(payload => {
					let temp = {
						success: true,
						data: {}
					};
					delete payload.senha;
					delete payload['senha'];
					temp["data"][entidade_nome] = payload;
					res.statusCode = 200;
					res.json(temp);

				})
				.catch(error => {
					console.log(error);
					res.statusCode = 500;
					res.json(
						{
							success: false,
							data: {},
							error: error
						});
				});

		} else {
			resp = {
				success: false,
				error: "The system is not empty!"
			};
			res.json(resp);
		}
	}).catch(error => {
		console.log(error);
		res.statusCode = 500;
		res.json({
			success: false,
			data: {},
			error: error
		})
	});
});

router.post('/login', (req, res) => {

	if (req.body.email !== undefined && req.body.senha !== undefined) {

		entidade.findOne({
			where: {
				email: req.body.email
			}
		})
			.then(retorno => {
				if (retorno !== null) {
					let pass = retorno.senha.split('.');
					console.log(pass);
					req.body.senha = Util.sha512(req.body.senha, pass[1]);
					if (req.body.senha == retorno.senha) {
						res.statusCode = 200;
						let token_claims = {
							nome: retorno.nome,
							email: retorno.email,
							admin: retorno.admin
						};
						let token = jwt.sign(token_claims, process.env.JWT_PASSWORD, { expiresIn: process.env.JWT_EXPIRATION });

						res.json({ success: true, data: token });
					} else { // quando senha incorreta
						res.statusCode = 403;
						res.json({ "success": false, "error": "Invalid Credentials" });
					}

				} else { // quando email incorreto
					res.statusCode = 403;
					res.json({ "success": false, "error": "Invalid Credentials" });
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
		res.json({ "success": false, "error": "bad request" });
	}
});




// Verifica se o JWT fornecido é válido
// Se for válido e o tempo de expiração <= 5 minutos, retorna um novo token (com tempo de expiração = 15 minutos)
// Se o token ainda for válido, retorna ele mesmo.
router.post('/isvalid', (req, res) => {
	if (req.body.token !== undefined) {
		let token = req.body.token;
		try {
			var decoded = jwt.verify(token, process.env.JWT_PASSWORD);
			res.statusCode = 200;
			console.log("Token decodado: ");
			console.log(decoded);
			if (parseInt(decoded.exp) - Math.floor(Date.now() / 1000) <= parseInt(process.env.JWT_RENEW)) { // se estiver espirando...
				delete decoded.iat;
				delete decoded.exp;
				let new_jwt = jwt.sign(decoded, process.env.JWT_PASSWORD, { expiresIn: process.env.JWT_EXPIRATION });
				res.json({ success: true, token: new_jwt });
			} else {
				res.json({ success: true, token: req.body.token });
			}
		} catch (err) {
			console.log(err);
			res.statusCode = 403;
			res.json({ success: false, "error": "Invalid Token, please login!" });
		}
	} else {
		res.statusCode = 400;
		res.json({ "success": false, "error": "bad request" });
	}
});

module.exports = router;