/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcionario_wine', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
  }, {
    tableName: 'funcionario_wine'
  });
};
