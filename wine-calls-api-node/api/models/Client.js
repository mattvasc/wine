var db=require('../../dbconnection'); //reference of dbconnection.js
 
var Client={
 
getAllClients:function(callback){
 
return db.query("Select * from client",callback);
 
},
 getClientById:function(id,callback){
 
return db.query("select * from client where id=?",[id],callback);
 },
 addClient:function(Client,callback){
 return db.query("Insert into client values(?,?,?)",[Client.id,Client.name,Client.email],callback);
 },
 deleteClient:function(id,callback){
  return db.query("delete from client where Id=?",[id],callback);
 },
 updateClient:function(id,Client,callback){
  return db.query("update client set name=?, email=? where id=?",[Client.name,Client.email,id],callback);
 }
 
};
 module.exports=Client;