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
    nome_para_contato: {
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
    situacao: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'empresa_parceira'
  });
};
