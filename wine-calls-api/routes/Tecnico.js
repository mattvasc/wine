const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "tecnico";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = geradorDeRotas(Model, entidade_nome);

let entidade = Model[entidade_nome];

router.get('/empresa/:id', function(req, res) {
    const empresa_id = req.params.id;
    entidade.findAll({
        where: {
            empresa_do_tecnico_id: empresa_id
        }
      }).then(result => {
        let temp = {
            success: true, data: {}
        };
        temp["data"][entidade_nome] = result;
        res.json(temp);
    })
        .catch(error => res.json({
            success: false,
            data: {},
            error: error
        }));
});


router.get('/empresa/:id/nome/:nome', function(req, res) {
    const empresa_id = req.params.id;
    const nome = req.params.nome;
    entidade.findAll({
        where: {
            empresa_do_tecnico_id: empresa_id,
            nome: { [Op.like]: '%' + nome + '%'}
        }
      }).then(result => {
        let temp = {
            success: true, data: {}
        };
        temp["data"][entidade_nome] = result;
        res.json(temp);
    })
        .catch(error => res.json({
            success: false,
            data: {},
            error: error
        }));
});


router.get('/nome/:nome', function (req, res) {
	const nome = req.params.nome;

	entidade.findAll({
		where: {
				nome: { [Op.like]: '%' + nome + '%'}
		},
		limit: 5
	})
	.then(result => {
		let temp = {success: true, data: {}};
		temp.data["tecnico"] = result;
		res.json(temp);
	})
	.catch(error => res.json({
			success: false,
			data: {},
			error: error
	}));
});

module.exports = router;
