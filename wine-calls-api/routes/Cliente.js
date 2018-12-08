const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "cliente";
const Sequelize = require('sequelize');

let entidade = Model[entidade_nome];

const router = geradorDeRotas(Model, entidade_nome);
const Op = Sequelize.Op;
/* Rotas extras específicas para o domínio */

router.get('/nome/:nome', function (req, res) {
	const nome = req.params.nome;

	entidade.findAll({
		where: {
			[Op.or]: { 
				nome_fantasia: { [Op.like]: '%' + nome + '%'},
				razao_social: { [Op.like]: '%' + nome+'%'}
			}	
		},
		limit: 5
	})
	.then(result => {
		let temp = {success: true, data: {}};
		temp.data["cliente"] = result;
		res.json(temp);
	})
	.catch(error => res.json({
			success: false,
			data: {},
			error: error
	}));
});

module.exports = router;