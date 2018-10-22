/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('endereco', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cep: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    logradouro: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    cidade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cidade',
        key: 'id'
      }
    },
    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'endereco'
  });
};
