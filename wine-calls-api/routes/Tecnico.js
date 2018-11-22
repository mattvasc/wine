const Model = require('../model');
const geradorDeRotas = require('./gerador_de_rotas');
const entidade_nome = "tecnico";

const router = geradorDeRotas(Model, entidade_nome);

let entidade = Model[entidade_nome];

router.get('/empresa/:id', function(req, res) {
    const empresa_id = req.params.id;
    entidade.findAll({
        where: {
            empresa_do_tecnico_id: empresa_id
        }
      }).then(result => {
        let temp = {
            success: true, data: {}
        };
        temp["data"][entidade_nome] = result;
        console.log(`Deu boa, retornando...`);
        res.json(temp);
    })
        .catch(error => res.json({
            success: false,
            data: {},
            error: error
        }));
});

module.exports = router;