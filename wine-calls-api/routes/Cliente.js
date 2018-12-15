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

router.get('/relatorio/id/:id/periodo/:periodo', function (req, res) {
	const id_arg = req.params.id;
	let periodo_inicio = new Date(req.params.periodo);
	const periodo_fim = new Date(periodo_inicio.getFullYear(), periodo_inicio.getMonth() + 2, 0);
	console.log(periodo_fim);
	const ticketRepo = Model['ticket'];

	ticketRepo.findAll({
		where: { "cliente_id": id_arg, "ticket_status" : {
			[Op.and] : {
				[Op.ne] : "aberto",
				[Op.ne] : "cancelado"
			}

		} },
		// TODO por data aqui
		include: [{ all: true, nested: true }]
	}).then(resultado => {
		// res.json(resultado);
		if (resultado.length == 0) {
			res.statusCode = 404;
			return res.json({ "success": true });
		}

		const pdftk = require('node-pdftk');
		pdftk
			.input('./pdfs/Relatorio_Cliente.pdf')
			.fillForm({
				razao_social: resultado[0].cliente.razao_social,
				periodo: ("0" + periodo_inicio.getDate()).substr(-2) + "/" + ("0" + (periodo_inicio.getMonth() + 1)).substr(-2) + "/" + periodo_inicio.getFullYear() +
					' - ' + ("0" + periodo_fim.getDate()).substr(-2) + "/" + ("0" + (periodo_fim.getMonth() + 1)).substr(-2) + "/" + periodo_fim.getFullYear(),

				categoria: resultado.map(value => {
					return value['tipo_ticket'];
				}).join('\n'),
				data_atendimento: resultado.map(value => {
					if (value['data_inicio'])
						return value['data_inicio'].split(' ')[0].split('-').reverse().join('/');
					else
						return '';
				}).join("\n"),

				estado_chamado: resultado.map(value => {
					return value['ticket_status'].replace(/_/g, ' ').replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
				}).join("\n"),

				tecnico: resultado.map(value => {
					if (value['tecnico'])
						return value['tecnico']['nome'];
					else
						return '';
				}).join("\n"),

				ticket_id: resultado.map(value => {
					return '' + value['ticket_id']
				}).join("\n"),

				//  descricao: (req.body.descricao) ? req.body.descricao : "",
				//  endereco:req.body.logradouro + ", " + req.body.logradouro_numero + ' - ' + req.body.bairro,
				//  cidade: req.body.cidade,
				//  email: req.body.email_contato,
				//  telefone: (req.body.cliente.telefones) ? req.body.cliente.telefones : "",
				//  data_abertura: ''+req.body.createdAt.split('T')[0].split('-').reverse().join('/'),
				//  tecnico: (req.body.tecnico.nome) ? req.body.tecnico.nome : "",
				//  observacoes: (req.body.observacoes) ? req.body.observacoes : ""
			})
			.flatten()
			.output()
			.then(buffer => {
				// Do stuff with the output buffer
				res.setHeader('Content-Type', 'application/pdf');
				res.setHeader('Content-Disposition', 'attachment; filename=Ordem_de_Servico.pdf');
				res.setHeader('Content-Length', Buffer.byteLength(buffer));
				res.send(buffer);
			});
	})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.json({ "success": false, error: "Erro interno ao gerar pdf!" });
		});
});

module.exports = router;
