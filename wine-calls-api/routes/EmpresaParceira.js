const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "empresa_parceira";
let quais_rotas = {
  "single": true,
  "all": true,
  "paginacao": true,
  "describe": true,
  "create": false,
  "update": true,
  "delete": true
}
const router = geradorDeRotas(Model, entidade_nome, quais_rotas);
let entidade = Model[entidade_nome];
let xablau = Model['endereco'];

router.get('/full/:id', function (req, res) {
  console.log(`Indo pegar um @s ${entidade_nome}`);
  Model.sequelize.query(`SELECT empresa_parceira.id AS \`id\`, empresa_parceira.pagamento_id AS \`pagamento.id\`, empresa_parceira.endereco_id AS \`endereco.id\`,
  empresa_parceira.cnpj, empresa_parceira.nome_fantasia,  empresa_parceira.razao_social, empresa_parceira.telefones, 
  empresa_parceira.email, empresa_parceira.status, empresa_parceira.observacoes, empresa_parceira.valor_visita_tecnica, 
  empresa_parceira.valor_km, empresa_parceira.ispj, empresa_parceira.cpf, empresa_parceira.rg, empresa_parceira.data_rg,
  endereco.cep AS \`endereco.cep\`, endereco.logradouro AS \`endereco.logradouro\`, endereco.complemento AS \`endereco.complemento\`, 
  endereco.bairro AS \`endereco.bairro\`, endereco.cidade AS \`endereco.cidade\`, pagamento.agencia AS \`pagamento.agencia\`, 
  endereco.estado AS \`endereco.estado\`,
  pagamento.conta AS \`pagamento.conta\`, pagamento.banco AS \`pagamento.banco\`, pagamento.nome_titular AS \`pagamento.nome_titular\`,
  pagamento.cpfcnpj AS \`pagamento.cpfcnpj\`, pagamento.ispoupanca AS \`pagamento.ispoupanca\`, pagamento.operacao AS \`pagamento.operacao\`,
  pagamento.ispj AS \`pagamento.ispj\`
  FROM empresa_parceira 
  INNER JOIN endereco ON (empresa_parceira.endereco_id = endereco.id)
  INNER JOIN pagamento ON (empresa_parceira.pagamento_id = pagamento.id) WHERE empresa_parceira.id =  ${req.params.id} ;`,
    { type: Model.sequelize.QueryTypes.SELECT })
    .then(success => {
      if (success.length > 0) {

        success = success[0];
        success.endereco = {};
        success.pagamento = {};
        for (var property in success) {
          if (success.hasOwnProperty(property)) {
            console.log(property);
            if (property.includes("endereco") && property != "endereco") {
              success.endereco[property.substring(9)] = success[property];
              delete success[property];
            } else if (property.includes("pagamento") && property != "pagamento") {
              success.pagamento[property.substring(10)] = success[property];
              delete success[property];
            }
          }
        }

        // key: the name of the object key
        // index: the ordinal position of the key within the object 
      }
      let response = { success: true, data: success };
      res.json(response);
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

// criar uma nova instancia
router.post('/create', function (req, res) {
  console.log("lalalalallalala");
  pagamento = Model["pagamento"];
  console.log("indo criar uma nova instancia de " + entidade_nome);
  console.log(entidade_nome);

  let new_pagamento = pagamento.build(req.body.pagamento);
  let new_endereco = Model['endereco'].build(req.body.endereco);
  new_pagamento.save().then(retorno => {
    delete req.body.pagamento;
    req.body.pagamento_id = retorno.id;
    new_endereco.save()
      .then(payload_address => {
        req.body.endereco_id = payload_address.id;
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(req.body);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        let new_parceiro = entidade.build(req.body);
        new_parceiro.save()
          .then(payload => {
            let temp = {
              success: true,
              data: { payload }
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
      }).catch(error => {
        console.log(error);
        res.json({
          success: false,
          data: {},
          error: error
        })
      });

  }
  );
});



module.exports = router;
