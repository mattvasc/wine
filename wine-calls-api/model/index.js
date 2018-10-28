'use strict';

const Fs = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');
const Credentials = require('../credentials');


const sequelize = new Sequelize(Credentials.database, Credentials.user, Credentials.password, {
	dialect:"mysql",
	omitNull:true
});
const db = {};

// Read all the files in this directory and import them as models
Fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.substr(-2) == 'js'))
  .forEach((file) => {
    const model = sequelize.import(Path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
