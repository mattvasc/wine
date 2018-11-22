<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var Ticket = require('../models/Ticket');

router.get('/:id?', function (req, res, next) {

	if (req.params.id && !isNaN(req.params.id) ) {

		Ticket.getTicketById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			}
			else {
				if(rows[0] != undefined)
					res.json(rows[0]);
				else
					res.json(null);
			}
		});
	}
	else if(req.params.id == "lala") { // Algum metodo especifico
		res.json("lala");
	}
	else {

		Ticket.getAllTickets(function (err, rows) {

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

	Ticket.addTicket(req.body, function (err, count) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(req.body);//or return count for 1 &amp;amp;amp; 0
		}
	});
});
router.delete('/:id', function (req, res, next) {
	Ticket.deleteTicket(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	Ticket.updateTicket(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		}
		else {
			res.json(rows);
		}
	});
});
=======
const Sequelize = require('sequelize');
const formidable = require('formidable')
const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const path = require('path')
const router = geradorDeRotas(Model, "ticket");
let entidade = Model["ticket"];

// Retorna a quantidade de chamados para o status informado, ou um objeto do tipo
// {aberto: 5, fechado: 13} se o parametro "todos" for informado para "status"
router.get('/count/:status', function (req, res) {

    const status = req.params.status;
    let taok = true;
	switch(status) {
        case 'aberto':
        case 'agendado':
        case 'em_atendimento':
        case 'entregue':
        case 'encerrado_com_sucesso':
        case 'encerrado_com_insucesso':
        case 'cancelado':
        case 'todos':
            break;
        default:
            taok = false;
            res.json({
                success: false,
                data: {},
                error: "Status Inválido!"
	        });
    }

    
    if(!taok) return;

    if(status != "todos") { // busca a quantidade de apenas um status
        entidade.count({
            where: {'ticket_status': status}
        })
        .then(result => {
            let temp = {success: true, data: {}};
            temp.data["count"] = result;
            res.json(temp);
        })
        .catch(error => res.json({
                success: false,
                data: {},
                error: error.toString()
        }));

    } else { // Busca a quantidade de todos os status de chamados
        entidade.findAll({
            group: ['ticket_status'],
            attributes: ['ticket_status', [Sequelize.fn('COUNT', 'ticket_status'), 'count']],
          }).then(function (result) {
            let temp = {success: true, data: {}};
            temp.data = result;
            
            res.json(temp);
          });
        
    }


});


//Função de teste para visualizarmos o upload de arquivos...
// Para testar via postman (ou curl se manjar):
// Sete o header do requst para {Content-Type: multipart/form-data}
// No body: {file: @arquivo_a_subir}
// O Arquivo vai ser salvo de acordo com a pasta setada no .env
router.post('/upload/comprovante', function (req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    uploadDir = process.env.COMPROVANTE_CHAMADO;
    form.uploadDir =  uploadDir;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({ error: err })
        res.status(200).json({ uploaded: true })
      })
      form.on('fileBegin', function (name, file) {
          console.log(file);
          console.log(name);
          
        const [fileName, fileExt] = file.name.split('.')
        file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
        
      });
});

>>>>>>> 58c7f2b4c111ad3a9fb8d506a513ff05aaa3a47c
module.exports = router;