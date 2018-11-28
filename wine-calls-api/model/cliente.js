/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    razao_social: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    nome_fantasia: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    cnpj: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    inscricao_estadual: {
      type: DataTypes.STRING(45),
      allowNull: true
    },

    ramo_de_atividade: {
      type: DataTypes.STRING(45),
      allowNull: true
    },

    cep: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    logradouro_numero: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(2),
      defaultValue: 'SP'
    },


    nome_para_contato: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    telefones: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },


    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
    
    
  }, {
    tableName: 'cliente'
  });
};
