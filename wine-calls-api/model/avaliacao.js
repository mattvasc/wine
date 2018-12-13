/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('avaliacao', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nota: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    avaliador: {
      type: DataTypes.STRING(10),
      allowNull: false
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
    ticket_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ticket',
        key: 'ticket_id'
      }
    }
  }, {
      tableName: 'avaliacao'
    });
};
