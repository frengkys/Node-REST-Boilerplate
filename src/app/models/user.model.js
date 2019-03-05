'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('c_user', {
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    usertype: DataTypes.TINYINT,
    phone: DataTypes.STRING,
    verifcode: DataTypes.TINYINT,
    statverif: DataTypes.TINYINT,
    statapproval: DataTypes.TINYINT,
    photo: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE(3),
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE(3),
        // defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        field: 'updated_at',
    },
    created_user: DataTypes.STRING,
    updated_user: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}