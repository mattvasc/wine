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
    ticket_cliente_id: {
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
    ticket_status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'aberto'
      /*
        aberto
        agendado
        em-atendimento
        entregue
        encerrado-com-sucesso
        encerrado-com-insucesso
        cancelado
      */
    },
    data_inicio: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    data_fim: {
      type: DataTypes.STRING(45),
      allowNull: true
    },

    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    },

    // Categoria do Ticket
    tipo_ticket: {
      type: DataTypes.STRING(45),
      allowNull: true
    }, 
    descricao: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    email_contato: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    endereco_contato_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    nome_contato: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    check_docs: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    check_pgto_cliete: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    check_pgto_tecnico: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    logradouro: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    logradouro_numero: {
      type: DataTypes.STRING(128),
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
    cidade: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(2),
      defaultValue: 'SP'
    },
    cep: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
  }, {
    tableName: 'ticket'
  });
};
