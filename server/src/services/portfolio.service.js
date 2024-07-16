const { findAll, findPortfolioById, createPortfolio, findWalletById, findStockByUserIdAndTicker, insertStock, updateWalletById, deleteStock, updateStockShares, updateStockSharesAndPrice } = require('../repositories/portfolio.repository');
const getTicker = require("../utils/ticker.helper")
const { insertIntoHistory } = require("./history.service")
const { getDate } = require("../utils/date.helper");
const response = require('../utils/error.helper');

const getAllUsers = async () => {
    return await findAll();
}

const findWallet = async (userId) => {
    const [portfolio] = await findWalletById(userId);
    return portfolio;
}

const updateWallet = async (userId, cash) => {
    await updateWalletById(userId, cash)
}

const initializePortfolio = async (userId) => {
    const find = await findWallet(userId);
    if (find) {
        return false;
    }
    const date = require('moment')().format('YYYY-MM-DD HH:mm:ss')
    await createPortfolio(userId, date);
    return true;
};

const findPortfolioByUserId = async (userId) => {
    const portfolio = await findPortfolioById(userId);

    if (!portfolio) {
        return [];
    }

    return portfolio;
};

const buy = async (userId, ticker, shares) => {

    const wallet = await findWallet(userId);

    if (!wallet) {
        return response("Users Portfolio not found", false);
    }
   
    const stock = await getTicker(ticker);

    if (!stock || stock.c === 0) {
        return response("Stock not found", false);
    }

    let price = stock.c;
    const totalSpent = price * shares;

    if (wallet.cash < totalSpent) {
        return response("Not enough cash", false);
    }

    const [findStock] = await findStockByUserIdAndTicker(userId, ticker);
    const date = getDate();

    if (findStock) {
        shares += findStock.shares;
        price = (totalSpent + findStock.shares * findStock.price) / shares;
        await updateStockSharesAndPrice(userId, ticker, shares, price, date);
    } else {
        await insertStock(userId, ticker, shares, price, date);
    }

    await updateWallet(userId, wallet.cash - totalSpent);
    await insertIntoHistory(userId, ticker, price, shares, date, "buy");

    return response("Stock bought", true);
};

const sell = async (userId, ticker, shares) => {

    const wallet = await findWallet(userId);

    if (!wallet) {
        return response("Users Portfolio not found", false);
    }

    const stock = await getTicker(ticker);

    if (!stock || stock.c === 0) {
        return response("Stock not found", false);
    }

    const price = stock.c;
    const total = price * shares;

    const [findStock] = await findStockByUserIdAndTicker(userId, ticker);

    if (!findStock) {
        return response("Stock not found in users portfolio", false);
    }

    const date = getDate();
    
    shares = findStock.shares - shares;

    if (shares < 0) {
        return response("Not enough shares to sell", false);
    }

    if (shares === 0) {
        await deleteStock(userId, ticker);
    } else {
        await updateStockShares(userId, ticker, shares, date)
    }

    await updateWallet(userId, wallet.cash + total);
    await insertIntoHistory(userId, ticker, price, shares, date, "sell");

    return response("Stock sold", true);
};

module.exports = { getAllUsers, findWallet, initializePortfolio, findPortfolioByUserId, buy, sell };




