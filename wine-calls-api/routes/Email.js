var express = require('express');
var router = express.Router();
var credentials = require('../credentials.js')
const SparkPost = require('sparkpost');

router.post('/enviar', function (req, res) {
  const client = new SparkPost(credentials['sparkpost']);

  client.transmissions.send({
    content: {
      from: 'buzzo@neeko.com.br',
      subject: req.body.titulo,
      html: req.body.texto
    },
    recipients: [
      {address: req.body.para}
    ]
  })
  .then(data => {
    console.log('E-mail enviado com sucesso');
    console.log(data);
  })
  .catch(err => {
    console.log('Envio de e-mail falhou');
    console.log(err);
  });
});

module.exports = router;
