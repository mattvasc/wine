/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    operacao_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    operacao: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    quem: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    quando: {
      type: DataTypes.DATE,
      allowNull: true
    },
    onde: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'log'
  });
};
