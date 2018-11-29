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
      type: DataTypes.STRING(14),
      allowNull: true
    },


    data_rg: {
      type: DataTypes.DATE,
      allowNull: false
    },

    nascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },

    nome_pai: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    nome_pai: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    rg: {
      type: DataTypes.STRING(9),
      allowNull: false
    },

    observacoes: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    
  }, {
    tableName: 'funcionario_wine'
  });
};
