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

    let body = "";

    body += "<img src=\"https://www.winetecnologia.com.br/wp-content/uploads/2018/02/logo-novo-1.png\">";

    body += "<p>Olá, " + nome + ", seu ticket foi gerado com sucesso!</p>";

    body += "<p><strong>Categoria do problema:</strong>  " + categoria + "</p>";

    body += "<p><strong>Descrição do problema:</strong> " + descricao + "</p>"

    // TODO: formatar a data para padrão pt-BR
    body += (data_de_agendamento == undefined) ? "" : "<p><strong>Data de agendamento:</strong> " + data_de_agendamento + " </p>";

    body += (tecnico == undefined) ? "" : "<p><strong>Nome do Tecnico:</strong> " + tecnico + "</p></br>";

    body += "<p>Atenciosamente,<br/>Wine Tecnologia.</p>";

    return body;
}


function gerarEmaildeNovoParaoTecnicoTicket(cliente, categoria, descricao,
    /*opcional:*/ data_de_agendamento, tecnico, endereco) {

    let body = "";

    body += "<img src=\"https://www.winetecnologia.com.br/wp-content/uploads/2018/02/logo-novo-1.png\">"


    body += "<p>Olá, " + tecnico + ", você recebeu um novo job!</p>";

    body += "<p><strong>Categoria do problema:</strong> " + categoria + "</p>";

    body += "<p><strong>Descrição do problema:</strong> " + descricao + "</p>"

    // TODO: formatar a data para padrão pt-BR
    body += (data_de_agendamento == undefined) ? "" : "<p><strong>Data de agendamento:</strong> " + data_de_agendamento + " </p>";

    body += (cliente == undefined) ? "" : "<p><strong>Nome do Cliente:</strong> " + tecnico + "</p></br>";

    body += "<p><strong>Endereço:</strong> " + endereco + "</p>"

    body += "<p>Atenciosamente,<br/>Wine Tecnologia.</p>";

    return body;

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
                data: {},
            };

            let endereco = req.body.logradouro + ", " + req.body.logradouro_numero;

            if (req.body.complemento)
                endereco += req.body.complemento;

            endereco += "<br />Bairro: " + req.body.bairro;

            endereco += "<br />Cidade: " + req.body.cidade;

            endereco += " - " + req.body.estado;

            if (req.body.email_tecnico) {
              //E-mail para o técnico
              Util.enviarEmail(req.body.email_tecnico, "[Wine] Você recebeu um novo job!", gerarEmaildeNovoParaoTecnicoTicket(req.body.cliente_nome, req.body.tipo_ticket, req.body.descricao, req.body.data_inicio, req.body.tecnico_nome, endereco));
            }

            //E-mail para o cliente
            Util.enviarEmail(req.body.email_contato, "[Wine] Detalhes do seu chamado", gerarEmaildeNovoParaoClienteTicket(req.body.cliente_nome, req.body.tipo_ticket, req.body.descricao, req.body.data_inicio, req.body.tecnico_nome));
            temp["data"][entidade_nome] = payload;
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

router.get('/full/limit/:limit/offset/:offset', function (req, res) {
  const limit_arg = parseInt(req.params.limit);
  const offset_arg = parseInt(req.params.offset);
  entidade.findAndCountAll({
      limit: limit_arg,
      offset: offset_arg,
      include: [{ all: true, nested: true }]
  })
  .then(result => {
      let temp = { success: true, data: {} };
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

router.get('/full/status/:status/limit/:limit/offset/:offset', function (req, res) {
  const limit_arg = parseInt(req.params.limit);
  const offset_arg = parseInt(req.params.offset);
  const status = req.params.status;
  entidade.findAndCountAll({
      limit: limit_arg,
      offset: offset_arg,
      include: [{ all: true, nested: true }],
      where: { "ticket_status" : status }
  })
  .then(result => {
      let temp = { success: true, data: {} };
      temp.data["ticket"] = result.rows;
      temp.data['count'] = result.count;
      res.json(temp);
  })
  .catch(error => {
    console.log(error);
    res.json({
      success: false,
      data: {},
      error: JSON.stringify(error)
    })
  });
});

// Retorna com paginação os status solicitados
router.get('/status/:status/limit/:limit/offset/:offset', function (req, res) {
    const status = req.params.status;
    const limit_arg = parseInt(req.params.limit);
    const offset_arg = parseInt(req.params.offset);
    let taok = true;
    switch (status) {
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
    if (!taok) return;

    entidade.findAndCountAll({
        limit: limit_arg,
        offset: offset_arg,
        where: { 'ticket_status': status }
    })
        .then(result => {
            let temp = { success: true, data: {} };
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
    switch (status) {
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


    if (!taok) return;

    if (status != "todos") { // busca a quantidade de apenas um status
        entidade.count({
            where: { 'ticket_status': status }
        })
            .then(result => {
                let temp = { success: true, data: {} };
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
            let temp = { success: true, data: {} };
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
router.post('/upload/comprovante/:id', function (req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    uploadDir = process.env.COMPROVANTE_CHAMADO;
    form.uploadDir = uploadDir;
    form.parse(req, (err, fields, files) => {
        if (err)
          return res.status(500).json({ error: err });

        entidade.findOne({
          where: {"ticket_id" : req.params.id}
        }).then(function (result) {
          console.log(result);
            result.ticket_status = "entregue";
            console.log(result);

            result.update({ticket_status: "entregue"});
          }).catch(err => console.log(err));

        res.status(200).json({
          uploaded: true
        })
    })
    form.on('fileBegin', function (name, file) {
        // console.log(file);
        // console.log(name);

        const [fileName, fileExt] = file.name.split('.')
        file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)

    });
});

/* Envia:
ticket_id
cliente
descricao
endereco
cidade
estado
telefone
email
categoria
data_abertura
tecnico
observacoes

Recebe:
Ordem_de_Servico.pdf
*/
router.post('/ordemdeservico', function (req, res) {
    console.log(req.body);
    const pdftk = require('node-pdftk');
    pdftk
        .input('./pdfs/Ordem_de_Servico.pdf')
        // .input('./Ordem_de_Servico.pdf')
        .fillForm({
            id_chamado: ''+req.body.ticket_id,
            cliente: req.body.cliente.razao_social,
            descricao: (req.body.descricao) ? req.body.descricao : "",
            endereco:req.body.logradouro + ", " + req.body.logradouro_numero + ' - ' + req.body.bairro,
            cidade: req.body.cidade,
            email: req.body.email_contato,
            telefone: (req.body.cliente.telefones) ? req.body.cliente.telefones : "",
            estado: (req.body.estado) ? req.body.estado : "",
            categoria: req.body.tipo_ticket,
            data_abertura: ''+req.body.createdAt.split('T')[0].split('-').reverse().join('/'),
            tecnico: (req.body.tecnico.nome) ? req.body.tecnico.nome : "",
            observacoes: (req.body.observacoes) ? req.body.observacoes : ""
        })
        .flatten()
        .output()
        .then(buffer => {
            // Do stuff with the output buffer
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=Ordem_de_Servico.pdf');
            res.setHeader('Content-Length', Buffer.byteLength(buffer));
            res.send(buffer);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.json({"success":false, error: "Erro interno ao gerar pdf!"});
        });
});

module.exports = router;
