const { getPool } = require('./database/createPool');

const save = async (userId, ticker, price, shares, date, type) => {
    let conn;
    try {
        conn = await getPool()
        await conn.query(`INSERT INTO history VALUES (?, ?, ?, ?, ?, ?)`, [userId, ticker, shares, price, date, type])
    } catch (error) {
        console.log(error);
    }
}

const findByUserIdAndTicker = async (userId, ticker) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM history WHERE userId=? AND ticker=?`, [userId, ticker])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findByUserId = async (userId) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM history WHERE userId=?`, [userId])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findByTicker = async (ticker) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM history WHERE ticker=?`, [ticker])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { save, findByUserIdAndTicker, findByUserId, findByTicker };