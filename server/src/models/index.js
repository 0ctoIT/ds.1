const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config/config');

const db = {};

// pulls definitions from config.js
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// read all files in directory and filter out index.js
fs.readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    // create model for each file and set model in database
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// ensuring access to sequelize and Sequelize objects in the db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
