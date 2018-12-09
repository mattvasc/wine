const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "cliente";
const Sequelize = require('sequelize');

let entidade = Model[entidade_nome];

const router = geradorDeRotas(Model, entidade_nome);
const Op = Sequelize.Op;
/* Rotas extras específicas para o domínio */
router.get('/nome/:nome/limit/:limit/offset/:offset', function (req, res) {
	let nome = req.params.nome;
	let limit_param = req.params.limit;
	let offset_param = req.params.offset;

	if (isNaN(limit_param) || isNaN(offset_param)) {
		res.statusCode = 400;
		res.json({
			success: false,
			data: {},
			error: "Provide valide limit and offset values!"
		});
	}

	// Convert to int
	limit_param = + limit_param;
	offset_param = + offset_param;

	entidade.findAndCountAll(
		{
			limit: limit_param,
			offset: offset_param,
			where: {
				[Op.or]: {
					nome_fantasia: { [Op.like]: '%' + nome + '%' },
					razao_social: { [Op.like]: '%' + nome + '%' }
				}
			}
		}).then(result => {
			console.log(nome);
			let temp = {
				success: true, data: {}
			};
			temp["data"][entidade_nome] = result.rows;
			temp['count'] = result.count;
			res.json(temp);
		})
		.catch(error => res.json({
			success: false,
			data: {},
			error: error
		}));

});

router.get('/nome//limit/:limit/offset/:offset', function (req, res) {
	console.log("entrou na rota certa");
	let limit_param = req.params.limit;
	let offset_param = req.params.offset;

	if (isNaN(limit_param) || isNaN(offset_param)) {
		res.statusCode = 400;
		res.json({
			success: false,
			data: {},
			error: "Provide valide limit and offset values!"
		});
	}

	// Convert to int
	limit_param = + limit_param;
	offset_param = + offset_param;

	entidade.findAndCountAll(
		{
			limit: limit_param,
			offset: offset_param
		}).then(result => {
			let temp = {
				success: true, data: {}
			};
			temp["data"][entidade_nome] = result.rows;
			temp['count'] = result.count;
			res.json(temp);
		})
		.catch(errors => res.json({
			success: false,
			data: {},
			error: errors
		}));

});



module.exports = router;