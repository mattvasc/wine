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
    data_criacao: {
      type: DataTypes.DATE,
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
    ticket_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ticet_status',
        key: 'id'
      }
    },
    data_inicio: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    data_fim: {
      type: DataTypes.STRING(45),
      allowNull: true
    },    
    status: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(256),
      allowNull: true
    },

    tipo_ticker: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
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
    }
    check_pgto_cliete: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
    check_pgto_tecnico: {
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
    // }
  }, {
    tableName: 'ticket'
  });
};
