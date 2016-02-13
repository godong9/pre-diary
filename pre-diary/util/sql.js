var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : ''
    //database: 'prediary' // TODO: DB세팅 후 풀어야함
});

module.exports = {
    mysql: mysql,
    pool: pool
};