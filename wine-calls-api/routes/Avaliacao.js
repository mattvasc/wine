const Sequelize = require('sequelize');
const formidable = require('formidable')
const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const path = require('path')
const util = require('../Util');
const entidade_nome = "avaliacao";
let entidade = Model[entidade_nome];

let quais_rotas = {
    "single": false,
    "all": false,
    "paginacao": false,
    "describe": false,
    "create": false,
    "update": false,
    "delete": false
};

const router = geradorDeRotas(Model, "avaliacao", quais_rotas);

router.get("/c/:id_chamado/:id_empresa/:id_tecnico/:valor", function(req, res) {
  const ticket_id = parseInt(req.params.id_chamado);
  const empresa_id = parseInt(req.params.id_empresa);
  const tecnico_id = parseInt(req.params.id_tecnico);
  let temp = entidade.build();

  temp.nota = (req.params.valor == "sim") ? "1" : "0";
  temp.cliente_id = (+empresa_id);
  temp.tecnico_id = (+tecnico_id);
  temp.ticket_id = (+ticket_id);
  //console.log(req.body);
  //console.log(temp);

  temp.avaliador = "cliente";

  temp.save()
    .then(payload => {
      let temp = {
        success: true,
        data: {}
      };
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

  //console.log(temp);
});

router.get("/t/:id_chamado/:id_empresa/:id_tecnico/:valor", function(req, res) {
  const ticket_id = parseInt(req.params.id_chamado);
  const empresa_id = parseInt(req.params.id_empresa);
  const tecnico_id = parseInt(req.params.id_tecnico);
  let temp = entidade.build();

  temp.nota = (req.params.valor == "sim") ? "1" : "0";
  temp.cliente_id = (+empresa_id);
  temp.tecnico_id = (+tecnico_id);
  temp.ticket_id = (+ticket_id);
  //console.log(req.body);
  //console.log(temp);

  temp.avaliador = "tecnico";

  temp.save()
    .then(payload => {
      let temp = {
        success: true,
        data: {}
      };
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

  //console.log(temp);
});

module.exports = router;
