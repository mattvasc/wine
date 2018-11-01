/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresa_parceira', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cnpj: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nome_fantasia: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    razao_social: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    telefones: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    endereco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    pagamento_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'pagamento',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    valor_visita_tecnica: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valor_km: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tipo_pessoa: {
      type: DataTypes.STRING(45),
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
    }
    // nome_para_contato: {
    //   type: DataTypes.STRING(45),
    //   allowNull: true
    // },
  }, {
    tableName: 'empresa_parceira'
  });
};
