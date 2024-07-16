const { getPool } = require('./database/createPool');

const findByUserId = async (userId) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM users WHERE userId=?`, [userId])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const insert = async (userId, email, username, avatar_url, accessToken, refreshToken) => {
    let conn;
    try {
        conn = await getPool()
        return await conn.query(`INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)`, [userId, email, username, avatar_url, accessToken, refreshToken])
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update = async (userId, email, username, avatar_url, accessToken, refreshToken) => {
    let conn;
    try {
        conn = await getPool()
        await conn.query(`UPDATE users SET email=?, username=?, avatarUrl=?, accessToken=?, refreshToken=? WHERE userId=?`, [email, username, avatar_url, accessToken, refreshToken, userId])
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findByUserId, insert, update };