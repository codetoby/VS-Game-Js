const { getStocksValue } = require("../utils/portfolio.helper");
const getTicker = require("../utils/ticker.helper");
const { findPortfolioByUserId, findWallet } = require("../services/portfolio.service");
const { totalChange } = require("../utils/portfolio.helper");
const { round } = require("../utils/round.helper");

const formatData = async (userId) => {

    let data = {
        stocks: []
    }

    const portfolio = await findPortfolioByUserId(userId);
    const wallet = await findWallet(userId);
    const currentPortoflioValue = await getStocksValue(portfolio, true);
    const change = await totalChange(portfolio, wallet);

    const portfolioInformation = {
        cash: wallet.cash,
        portfolioValue: currentPortoflioValue,
        change: change
    }

    data.portfolio = portfolioInformation;

    for (const stock of portfolio) {
        const stockInfo = await getTicker(stock.ticker);
        if (!stockInfo) {
            continue;
        }
        stock.data = stockInfo;
        stock.profit = calculateProfit(stock, stock.data.c);
        data.stocks.push(stock);
    }

    return data;

}

const calculateProfit = (stock, currentPrice) => {

    const totalSpent = stock.shares * stock.price;
    const currentTotal = stock.shares * currentPrice;

    return {
        profit: round(currentTotal - totalSpent),
        percentage: round(((currentTotal / totalSpent) - 1) * 100)
    }

}

module.exports = { formatData }