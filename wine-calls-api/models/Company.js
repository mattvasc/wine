var db = require('../dbconnection'); //reference of dbconnection.js

var Company = {

	getAllCompanies: function (callback) {

		return db.query("Select * from company", callback);

	},
	getCompanyByCNPJ: function (cnpj, callback) {

		return db.query("select * from cpnj where cnpj=?", [cpnj], callback);
	},
	addCompany: function (Company, callback) {
		return db.query("Insert into company values(?,?,?,?,?,?)", [Company.cnpj, Company.name, Company.address, Company.site, Company.email, Company.phone], callback);
	},
	deleteCompany: function (cnpj, callback) {
		return db.query("delete from company where cnpj=?", [cnpj], callback);
	},
	updateCompany: function (cnpj, Company, callback) {
		return db.query("update company set name=?, address=?, site=?, email=?, phone=?  where cnpj=?", [Company.name, Company.address, Company.site, Company.email, Company.phone, cnpj], callback);
	}

};
module.exports = Company;