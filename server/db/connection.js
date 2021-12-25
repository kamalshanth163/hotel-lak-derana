require('dotenv').config();
const mysql = require("mysql");

var dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
})

dbConnection.connect((err) => {
    if(!err){
        console.log("Database connected successfully")
    } else {
        console.log("Database connection failed")
    }
})

module.exports = dbConnection;