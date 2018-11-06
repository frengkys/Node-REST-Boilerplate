require('dotenv').config()

module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
      operatorsAliases: false,
      secret: process.env.SECRET,
      define: {
          //prevent sequelize from pluralizing table names
          freezeTableName: true,
          underscored: true,
      },
      dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
  
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
          return next()
        },
      },
      timezone: "Asia/Jakarta"
    },
    test: {
      username: 'database_test',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql',
      operatorsAliases: false,
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
    }
  };