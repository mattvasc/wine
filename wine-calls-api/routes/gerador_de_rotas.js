module.exports = function buildRoutes(Model, entidade_nome /* TODO: escolher quais rotas criar */) {
var express = require('express');
var router = express.Router();
let entidade = Model[entidade_nome];

// get all
router.get('/', function (req, res) {
	entidade.findAll().then(result => {
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
		}));;
});

// get com Com paginação
router.get('/limit/:limit/offset/:offset', function (req, res) {
	let limit_param = req.params.limit;
	let offset_param = req.params.offset;

	if(isNaN(limit_param) || isNaN(offset_param))
	{
		res.json({
			success: false,
			data: {},
			error: "Provide valide limit and offset values!"
		});
	}
	limit_param = + limit_param;
	offset_param = + offset_param;
	console.log(`Limit: ${limit_param} - offset ${offset_param}`);
	entidade.findAll({ limit: limit_param, offset: offset_param }).then(result => {
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
		}));;
});

//describe current model
router.get('/describe', function (req, res) {
	Model.sequelize.query(`describe ${entidade_nome};`).then(result => {
		res.json(result);
	});
});

// criar uma nova instancia
router.post('/', function (req, res) { 
	let temp = entidate.build(req.body);
	temp.save()
	.then( payload => {
		let temp = {
			success: true,
			data: {}
		};
		temp["data"][entidade_nome] = payload;
		res.json(temp);
	})
	.catch(error => res.json({
		success: false,
		data: {},
		error: error
	}));
});


// atualizar instancia atual
router.put('/:id', function (req, res) {
 
	
    const object_id = req.params.id;
	if(object_id === undefined || isNaN(object_id))
	{
		res.json({
			success: false,
			data: {},
			error: ("Missing id for " + entidade_nome)
		});
	}
    entidade.update(req.body, {
            where: {
                id: object_id
            }
        })
		.then(payload => 
		{
			let temp = {
				success: true,
				"affected_rows": payload
			}
			res.json(temp);
		})
		.catch( error => res.json({
			success: false,
			data: {},
			error: error
		}));  
});


// deletar instancia atual
router.delete('/:id', function(req, res){
	const object_id = req.params.id;
	if(object_id === undefined || isNaN(object_id))
	{
		res.json({
			success: false,
			data: [],
			error: ("Missing id for " + entidade_nome)
		});
	}
	entidade.destroy({
		where: {
			id: object_id
		}
	}).then(affectedRows => {
		res.json({
			success: true,
			data: {"affected_rows": affectedRows}
		})
	}).catch(error => res.json({
		success: false,
		data: [],
		error: error
	}));  
});
	return router;
}