const mongoose = require('mongoose');
mongoose.connect(process.env.databaseKey);

const connection = mongoose.connection
connection.on('connected', ()=>console.log("Connection with DB established."));
connection.on('error', ()=>console.log("Failed to connect to DB."));