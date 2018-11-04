const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "estado";

const router = geradorDeRotas(Model, entidade_nome);

module.exports = router;