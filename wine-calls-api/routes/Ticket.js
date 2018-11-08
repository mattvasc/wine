const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');

const Sequelize = require('sequelize');

const router = geradorDeRotas(Model, "ticket");

let entidade = Model["ticket"];

// Retorna a quantidade de status para o status informado, ou um objeto
// {aberto: 5, fechado: 13} se o parametro "todos" for informado para "status"
router.get('/count/:status', function (req, res) {

    const status = req.params.status;
    console.log(">>>>>>>>>>>>" + status);
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

    if(status!= "todos") { // busca a quantidade de apenas um status
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



module.exports = router;