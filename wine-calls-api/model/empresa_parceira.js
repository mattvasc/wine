/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const empresa_parceira =  sequelize.define('empresa_parceira', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cnpj: {
      type: DataTypes.STRING(18),
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
      type: DataTypes.STRING(128),
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
    ispj: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    cpf: {
      type: DataTypes.STRING(14),
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
    tableName: 'empresa_parceira',
    underscored: true
  });
  empresa_parceira.associate = models => {
    empresa_parceira.hasOne(models.endereco);
    empresa_parceira.hasOne(models.pagamento);
    // empresa_parceira.belongsToMany(model.Address, {through: model.UserAddress, foreignKey: "userId" })
}
  return empresa_parceira;
};
