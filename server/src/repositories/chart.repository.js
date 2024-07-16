const findByUserId = async (userId) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM chart WHERE userId = ? ORDER BY timestamp ASC`, [userId])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const insert = async (userId, value, timestamp) => {
    let conn;
    try {
        conn = await getPool()
        await conn.query(`INSERT INTO chart VALUES (?, ?, ?)`, [userId, value, timestamp])
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findByUserId, insert };