/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    ticket_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id'
      }
    },
    tecnico_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tecnico',
        key: 'id'
      }
    },
    endereco_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    ticket_cliente_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data_agendamento: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
     preco_cliente: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    preco_tecnico: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    situacao: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    tableName: 'ticket'
  });
};
