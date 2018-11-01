/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cidade', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    estado_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'estado',
        key: 'id'
      }
    }
  }, {
    tableName: 'cidade'
  });
};