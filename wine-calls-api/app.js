const result = require('dotenv').config()
var commandExists = require('command-exists');


if (result.error) {
  throw result.error
}

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

const routes = require('./routes/index');
const clienteRouter = require('./routes/Cliente');
const empresaParceiraRouter = require('./routes/EmpresaParceira');
const tecnicoRouter = require('./routes/Tecnico');
const ticketRouter = require('./routes/Ticket');
const testRouter = require('./routes/Test');
const FuncRouter = require('./routes/Funcionario');
const Model = require('./model/');


const app = express();
// var favicon = require('serve-favicon');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Trocar para um for na pasta routes
app.use('/', routes);
app.use('/clientes', clienteRouter);
app.use('/tecnicos', tecnicoRouter);
app.use('/funcionarios', FuncRouter);
app.use('/empresasParceiras', empresaParceiraRouter);
app.use('/tickets', ticketRouter);
app.use('/tests', testRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = "route not found";
    let temp = {success: false, error: err};
    res.json(temp);
});

    // error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

Model.sequelize.models.ticket.belongsTo(Model.sequelize.models.cliente, {foreignKey: 'cliente_id'});
Model.sequelize.models.ticket.belongsTo(Model.sequelize.models.tecnico, {foreignKey: 'tecnico_id'});

Model.sequelize.sync(
    // {"force":true}
    ).then(() => {
        commandExists('pdftk', function(err, commandExists) {

            if(commandExists) {
                console.log('API Rodando na porta 3000');
                app.listen(3000);
            } else {
                console.log("[ERRO] Instale PDFTK Server CLI no servidor, e verifique se ele está no PATH");
            }

        });

 } );

module.exports = app;
