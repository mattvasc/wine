const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_cidade = "cidade";
const entidade_estado = "estado";

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

let entidadeCidade = Model[entidade_cidade];
let entidadeEstado = Model[entidade_estado];

entidadeEstado.hasMany(entidadeCidade, { foreignKey: 'estado_id' });
entidadeCidade.belongsTo(entidadeEstado, { foreignKey: 'estado_id' });

const router = geradorDeRotas(Model, entidade_cidade);

router.get('/estado/:estado', function (req, res) {
	const estado = req.params.estado;

	entidadeCidade.findAll({
		include: [{
			model: entidadeEstado,
			where: { uf: { [Op.like]: '%' + estado + '%'} },
			attributes: []
		}],
	})
	.then(result => {
		let temp = {success: true, data: {}};
		temp.data["cidade"] = result;
		res.json(temp);
	})
	.catch(error => res.json({
			success: false,
			data: {},
			error: error.toString()
	}));
});

module.exports = router;