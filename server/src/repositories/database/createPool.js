const mariadb = require('mariadb')
const { 
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT 
} = require('../../config')

let pool;
module.exports = {
    getPool: function () {
        if (!pool) {
            const config = {
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                port: DB_PORT
            };
            pool = mariadb.createPool(config);
        }
        return pool;
    }
};



