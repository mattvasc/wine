var express = require('express');
var router = express.Router();
var credentials = require('../credentials.js')
const SparkPost = require('sparkpost');


router.post('/enviar', function (req, res) {

  const client = new SparkPost(credentials['sparkpost']);
  let temp;
  try {
    temp = JSON.parse(req.body.para);
  } catch(e) {
    temp = req.body.para;
  }
  let enviar = [];
  if(Array.isArray(temp)) {
    for(let i = 0; i < temp.length; i++)
      enviar.push({address: temp[i]});
  } else
    enviar.push({address: temp});
    
  client.transmissions.send({
    content: {
      from: process.env.SENDER,
      subject: req.body.titulo,
      html: req.body.texto
    },
    recipients: enviar
  })
  .then(data => {
    console.log('E-mail enviado com sucesso');
    console.log(data);
    res.statusCode = 200;
    res.json({success:true, data: 'E-mail enviado com sucesso'});
  })
  .catch(err => {
    console.log('Envio de e-mail falhou');
    console.log(err);
    res.statusCode = 500;
    res.json({success:false, data: 'Falha ao enviar email!'});
  });
});

module.exports = router;
