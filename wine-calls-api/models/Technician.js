var db = require('../dbconnection'); //reference of dbconnection.js

var Technician = {

	getAllTechnicians: function (callback) {

		return db.query("Select * from technician", callback);

	},
	getTechnicianById: function (id, callback) {

		return db.query("select * from technician where id=?", [id], callback);
	},
	addTechnician: function (Technician, callback) {
		return db.query("Insert into technician(name, address, email) values(?,?,?)", [Technician.name, Technician.address, Technician.email], callback);
	},
	deleteTechnician: function (id, callback) {
		return db.query("delete from technician where id=?", [id], callback);
	},
	updateTechnician: function (id, Technician, callback) {
		return db.query("update technician set name=?, address=?, email=? where id=?", [Technician.name, Technician.address, Technician.email, id], callback);
	}

};
module.exports = Technician;