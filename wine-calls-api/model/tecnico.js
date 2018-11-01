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
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    telefones: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    rg: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    data_rg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    empresa_do_tecnico_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'empresa_parceira',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
    // endereco_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: true,
    //   references: {
    //     model: 'endereco',
    //     key: 'id'
    //   }
    // },
    // pagamento_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: true,
    //   references: {
    //     model: 'pagamento',
    //     key: 'id'
    //   }
    // }
  }, {
    tableName: 'tecnico'
  });
};
