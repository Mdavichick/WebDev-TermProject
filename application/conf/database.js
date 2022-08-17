const mysql = require ('mysql2');


const pool = mysql.createPool({
    host:"localhost",
    user:"Mdavichick",
    password:"Rockingproof1",
    database:"csc317db",
    connectionLimit: 50,
    debug: false,   // turn to true to error handle
});
const promisePool = pool.promise();
module.exports = promisePool;