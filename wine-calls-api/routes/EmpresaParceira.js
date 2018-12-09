const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "empresa_parceira";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let quais_rotas = {
  "single": true,
  "all": true,
  "paginacao": true,
  "describe": false,
  "create": true,
  "update": true,
  "delete": true
}
const router = geradorDeRotas(Model, entidade_nome, quais_rotas);

let entidade = Model[entidade_nome];




router.get('/nome/:nome', function (req, res) {
	const nome = req.params.nome;

	entidade.findAll({
		where: {
			[Op.or]: { 
				nome_fantasia: { [Op.like]: '%' + nome + '%'},
				razao_social: { [Op.like]: '%' + nome+'%'}
			}	
		},
		limit: 5
	})
	.then(result => {
		let temp = {success: true, data: {}};
		temp.data["empresa_parceira"] = result;
		res.json(temp);
	})
	.catch(error => res.json({
			success: false,
			data: {},
			error: error
	}));
});



// Get com associações
router.get('/full/:id', function (req, res) {
  console.log(`Indo pegar um @s ${entidade_nome}`);
  console.log(`SELECT \`id\`, \`cnpj\`, \`nome_fantasia\`, \`razao_social\`, \`telefones\`, \`email\`, \`cep\`, \`logradouro\`, \`numero\`, \`complemento\`, \`bairro\`, \`cidade\`, \`estado\`, \`pgto_agencia\`, \`pgto_conta\`, \`pgto_banco\`, \`pgto_nome_titular\`, \`pgto_cpfcnpj\`, \`pgto_ispoupanca\`, \`pgto_ispj\`, \`pgto_operacao\`, \`status\`, \`observacoes\`, \`valor_visita_tecnica\`, \`valor_km\`, \`cpf\`, \`rg\`, \`data_rg\`, \`created_at\`, \`updated_at\` FROM \`empresa_parceira\`  WHERE empresa_parceira.id =  ${req.params.id} ;`);
  Model.sequelize.query(`SELECT \`id\`, \`cnpj\`, \`nome_fantasia\`, \`razao_social\`, \`telefones\`, \`email\`, \`cep\`, \`logradouro\`, \`numero\`, \`complemento\`, \`bairro\`, \`cidade\`, \`estado\`, \`pgto_agencia\`, \`pgto_conta\`, \`pgto_banco\`, \`pgto_nome_titular\`, \`pgto_cpfcnpj\`, \`pgto_ispoupanca\`, \`pgto_ispj\`, \`pgto_operacao\`, \`status\`, \`observacoes\`, \`valor_visita_tecnica\`, \`valor_km\`, \`cpf\`, \`rg\`, \`data_rg\`, \`created_at\`, \`updated_at\` FROM \`empresa_parceira\`  WHERE empresa_parceira.id =  ${req.params.id} ;`,
    { type: Model.sequelize.QueryTypes.SELECT })
    .then(success => {
      if (success.length > 0) {

        success = success[0];
        // success.endereco = {};
        // success.pagamento = {};
        for (var property in success) {
          if (success.hasOwnProperty(property)) {
            console.log(property);
            // if (property.includes("endereco") && property != "endereco") {
            //   success.endereco[property.substring(9)] = success[property];
            //   delete success[property];
            // } else if (property.includes("pagamento") && property != "pagamento") {
            //   success.pagamento[property.substring(10)] = success[property];
            //   delete success[property];
            // }
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
      }).then( () => {
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


module.exports = router;
