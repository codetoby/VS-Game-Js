const { getPool } = require('./database/createPool');

const createPortfolio = async (userId, date) => {
    let conn;
    try {
        conn = await getPool()
        await conn.query(`INSERT INTO wallet (userId) VALUES (?)`, [userId])
    } catch (error) {
        console.log(error);
    }
}

const findAll = async () => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM wallet`)
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findWalletById = async (userId) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM wallet WHERE userId=?`, [userId])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateWalletById = async (userId, cash) => {
    let conn;
    try {
        conn = await getPool();
        await conn.query("UPDATE wallet SET cash = ? WHERE userId = ?", [cash, userId])
    } catch (error) {
        console.log(error)
    }
}

const findPortfolioById = async (userId) => {
    let conn;
    try {
        conn = await getPool()
        const find = await conn.query(`SELECT * FROM stocks WHERE userId=?`, [userId])
        return find
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findStockByUserIdAndTicker = async (userId, ticker) => {
    let conn;
    try {
        conn = await getPool();
        const find = await conn.query(`SELECT * FROM stocks WHERE userId=? AND ticker = ?`, [userId, ticker]);
        return find;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const insertStock = async (userId, ticker, shares, price, date) => {
    let conn;
    try {
        conn = await getPool();
        await conn.query(`INSERT INTO stocks VALUES (?, ?, ?, ?, ?)`, [userId, ticker, shares, price, date]);
    } catch (error) {
        console.log(error);
    }
}

const updateStockShares = async (userId, ticker, shares, date) => {
    let conn;
    try {
        conn = await getPool();
        await conn.query(`UPDATE stocks SET shares = ?, timestamp = ? WHERE userId = ? AND ticker = ?`, [shares, date, userId, ticker]);
    } catch (error) {
        console.log(error);
    }
}

const updateStockSharesAndPrice = async (userId, ticker, price, shares, date) => {
    let conn;
    try {
        conn = await getPool();
        await conn.query(`UPDATE stocks SET shares = ?, price = ?, timestamp = ? WHERE userId = ? AND ticker = ?`, [shares, price, date, userId, ticker]);
    } catch (error) {
        console.log(error);
    }
}

const deleteStock = async (userId, ticker) => {
    let conn;
    try {
        conn = await getPool();
        await conn.query(`DELETE FROM stocks WHERE userId = ? AND ticker = ?`, [userId, ticker]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findAll, createPortfolio, findPortfolioById, findWalletById, findStockByUserIdAndTicker, insertStock, updateStockShares, updateWalletById, deleteStock, updateStockSharesAndPrice };
