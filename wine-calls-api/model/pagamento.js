/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagamento', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    agencia: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    conta: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    banco: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nome_titular: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    cpfcnpj: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    ispoupanca: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    ispj: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    operacao: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    tableName: 'pagamento'
  });
};
