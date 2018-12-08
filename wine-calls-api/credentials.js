var credentials = {


host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB,
db_type: process.env.DB_TYPE,
sparkpost: "4f398b333ff7e6047a25cb867506ebd7abc5d2c0"
};
credentials.connection_string = `${credentials.db_type}://${credentials.host}:${credentials.port}/${credentials.database}`

module.exports=credentials;
