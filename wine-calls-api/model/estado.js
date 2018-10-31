/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estado', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    uf: {
      type: DataTypes.CHAR(2),
      allowNull: false
    }
  }, {
    tableName: 'estado'
  });
};
