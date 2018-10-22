/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome_fantasia: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    razao_social: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    cpfcnpj: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nome_para_contato: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    inscricao_estadual: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    inscricao_municipal: {
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
    nome_comprador: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email_comprador: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    data_de_fundacao: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    capital_social_atual: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    registro_na_junta: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    controle_acionario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numero_de_empregados: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ramo_de_atividade: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    informacoes_pagamento: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    situacao: {
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
    observacoes: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'cliente'
  });
};
