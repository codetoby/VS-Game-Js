const { save, findByUserIdAndTicker, findByUserId, findByTicker } = require('../repositories/history.repository');

const insertIntoHistory = async (userId, ticker, price, shares, date, ordertype) => {
    await save(userId, ticker, price, shares, date, ordertype)
}

const findHistoryByUserIdAndTicker = async (userId, ticker) => {
    return await findByUserIdAndTicker(userId, ticker)
}

const findHistoryByUserId = async (userId) => {
    return await findByUserId(userId)
}

const findHistoryByTicker = async (ticker) => {
    return await findByTicker(ticker)
}

module.exports = { 
    insertIntoHistory, 
    findHistoryByUserIdAndTicker, 
    findHistoryByUserId, 
    findHistoryByTicker 
};