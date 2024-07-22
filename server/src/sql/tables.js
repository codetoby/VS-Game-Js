const fs = require('fs');
const { getPool } = require('../repositories/database/createPool');


const createTables = async () => {

    try {
        const conn = await getPool();
        const sql = fs.readFileSync('./src/sql/tables.sql', 'utf8');
        const queries = sql.split(';').filter(query => query.trim());
        for await (const query of queries) {
            await conn.query(query);
        }
    } catch (err) {
        console.log('Error creating tables');
        console.error(err);
        process.exit(1);
    }
};

module.exports = { createTables };