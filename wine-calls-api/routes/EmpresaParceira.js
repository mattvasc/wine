const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "empresa_parceira";
let quais_rotas = {
  "single" : true,
  "all": true,
  "paginacao": true,
  "describe": true,
  "create": false,
  "update": true,
  "delete": true
}
const router = geradorDeRotas(Model, entidade_nome, quais_rotas);
let entidade = Model[entidade_nome];

// criar uma nova instancia
router.post('/create', function (req, res) {
  console.log("lalalalallalala");
  pagamento = Model["pagamento"];
	console.log("indo criar uma nova instancia de " + entidade_nome);
  let new_pagamento = pagamento.build(req.body.pagamento);
  new_pagamento.save().then(retorno =>
    {
      delete req.body.pagamento;
      req.body.pagamento_id = retorno.id;
      let new_parceiro = entidade.build(req.body);
      new_parceiro.save()
    	.then( payload => {
    		let temp = {
    			success: true,
    			data: {payload}
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
    	})});
    }
  );

});

module.exports = router;
