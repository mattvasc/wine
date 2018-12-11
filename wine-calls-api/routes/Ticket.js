
const Sequelize = require('sequelize');
const formidable = require('formidable')
const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const path = require('path')
const util = require('../Util');
const entidade_nome = "ticket";
let entidade = Model[entidade_nome];

let quais_rotas = {
    "single": true,
    "all": true,
    "paginacao": true,
    "describe": true,
    "create": false,
    "update": true,
    "delete": true
};

function gerarEmaildeNovoParaoClienteTicket(nome, categoria, descricao, 
    /*opcional:*/ data_de_agendamento, /*opcional:*/ tecnico) {
    return `
<img src="https://www.winetecnologia.com.br/wp-content/uploads/2018/02/logo-novo-1.png">
Olá ${nome.split(' ')[0]}, seu ticket foi gerado com sucesso! <br>
Categoria do problema:<br> ${categoria}<br>
Descrição do problema:<br>${descricao}<br>
` + (data_de_agendamento == undefined) ? "" : `
Data de agendamento: <br> ${data_de_agendamento} </br>`
+ (tecnico == undefined) ? "" : `
Nome do Tecnico: <br> ${tecnico} </br>
` +
`
Atenciosamente, 
Wine Tecnologia.
`;
}


function gerarEmaildeNovoParaoTecnicoTicket(cliente, categoria, descricao, 
    /*opcional:*/ data_de_agendamento, tecnico, endereco) {
    return `
<img src="https://www.winetecnologia.com.br/wp-content/uploads/2018/02/logo-novo-1.png">
Olá ${tecnico.split(' ')[0]}, você recebeu um novo job! <br>
Categoria do problema:<br> ${categoria}<br>
Descrição do problema:<br>${descricao}<br>
` + (data_de_agendamento == undefined) ? "" : `
Data de agendamento: <br> ${data_de_agendamento} <br>`
+ (tecnico == undefined) ? "" : `
Nome do Cliente: <br> ${cliente} <br>
` +
`
Endereço: ${endereco}<br><br><br>
Atenciosamente, 
Wine Tecnologia.
`;
}


const router = geradorDeRotas(Model, "ticket", quais_rotas);

// Cria um novo chamado e envia email para os caras
router.post('/', function (req, res) {
    console.log("indo criar uma nova instancia de " + entidade_nome);
    let temp = entidade.build(req.body);
    temp.save()
        .then(payload => {
            let temp = {
                success: true,
                data: {}
            };
            temp["data"][entidade_nome] = payload;
            /* util.enviarEmail()  
                para fazer o util.enviarEmail, antes temos que pegar os emails dos caras...
                Para isso podemos: 1) fazer o front enviar o email do cliente [e tecnico] (ênfase na notação de opcional)
                2) pegar o client_id[, tecnico_id] do banco, e buscar o email e daí sim disparar o email

                Usar as funções gerarEmaildeNovoParaoClienteTicket e gerarEmaildeNovoParaoTecnicoTicket aqui

            */
            res.json(temp);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false,
                data: {},
                error: error
            })
        });
});

// Retorna com paginação os status solicitados
router.get('/status/:status/limit/:limit/offset/:offset', function (req, res) {
    const status = req.params.status;
    const limit_arg = parseInt(req.params.limit);
    const offset_arg = parseInt(req.params.offset);
    let taok = true;
	switch(status) {
        case 'aberto':
        case 'agendado':
        case 'em_atendimento':
        case 'entregue':
        case 'encerrado_com_sucesso':
        case 'encerrado_com_insucesso':
        case 'cancelado':
            break;
        default:
            taok = false;
            res.statusCode = 400;
            res.json({
                success: false,
                data: {},
                error: "Status Inválido!"
	        });
    }
    if(!taok) return;
    
    entidade.findAndCountAll({
        limit: limit_arg,
        offset: offset_arg,
        where: {'ticket_status': status}
    })
    .then(result => {
        let temp = {success: true, data: {}};
        temp.data["ticket"] = result.rows;
        temp.data['count'] = result.count;
        res.json(temp);
    })
    .catch(error => res.json({
            success: false,
            data: {},
            error: JSON.stringify(error)
    }));

});

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
            res.statusCode = 400;
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
module.exports = router;

