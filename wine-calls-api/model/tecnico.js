/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tecnico', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    telefones: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    rg: {
      type: DataTypes.STRING(9),
      allowNull: false
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

    empresa_do_tecnico_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'empresa_parceira',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },


    observacoes: {
      type: DataTypes.STRING(45),
      allowNull: true
    }

  }, {
    tableName: 'tecnico'
  });
};
