const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "empresa_parceira";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let quais_rotas = {
  "single": true,
  "all": true,
  "paginacao": true,
  "describe": true,
  "create": false,
  "update": true,
  "delete": true
}
const router = geradorDeRotas(Model, entidade_nome);

let entidade = Model[entidade_nome];




router.get('/nome/:nome', function (req, res) {
  const nome = req.params.nome;

  entidade.findAll({
    where: {
      [Op.or]: {
        nome_fantasia: { [Op.like]: '%' + nome + '%' },
        razao_social: { [Op.like]: '%' + nome + '%' }
      }
    },
    limit: 5
  })
    .then(result => {
      let temp = { success: true, data: {} };
      temp.data["empresa_parceira"] = result;
      res.json(temp);
    })
    .catch(error => res.json({
      success: false,
      data: {},
      error: error
    }));
});


// Delete em cascata
router.delete('/full/:id', function (req, res) {
  let pagamento = Model["pagamento"];
  let endereco = Model["endereco"];
  let empresa_parceira = Model["empresa_parceira"];
  const object_id = req.params.id;

  if (object_id === undefined || isNaN(object_id)) {
    res.json({
      success: false,
      data: [],
      error: ("Missing id for " + entidade_nome)
    });
    return;
  }

  empresa_parceira.findByPk(object_id).then(result => {
    pagamento.destroy({
      where: {
        id: object_id.pagamento_id
      }
    })
      .catch(error => res.json({
        success: false,
        data: {},
        error: error
      }));

    endereco.destroy({
      where: {
        id: object_id.endereco_id
      }
    }).then(() => {
      empresa_parceira.destroy({
        where: {
          id: object_id
        }
      }).then(affectedRows => {
        res.json({
          success: true,
          data: { "affected_rows": affectedRows }
        })
      }).catch(error => res.json({
        success: false,
        data: [],
        error: error
      }));
    })
      .catch(error => res.json({
        success: false,
        data: {},
        error: error
      }));

  }).catch(error => res.json({
    success: false,
    data: {},
    error: error
  }));
});


/*
Enviar:
empresa_id
periodo

*/
router.post('/relatorio/id/:id/periodo/:periodo', function (req, res) {
  console.log(req.body);
  const pdftk = require('node-pdftk');
  const empresa_id = req.body.empresa_id;
  const periodo = req.body.periodo;
  pdftk
      .input('./pdfs/Relatorio_Empresa.pdf')
      // .input('./Ordem_de_Servico.pdf')
      .fillForm({
          empresa: req.body.empresa,
          periodo: req.body.periodo,
          ticket_id :req.body.ticket_id,
          categoria: req.body.categoria,
          cliente: req.body.cliente,
          data_de_atendimento: req.body.data_de_atendimento,
          estado_do_chamado: req.body.estado_do_chamado,
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
