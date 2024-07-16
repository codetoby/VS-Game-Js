const getTicker = require('./ticker.helper');
const { round } = require("./round.helper")

const getStocksValue = async (stocks, today) => {
    let value = 0;
    for await (const stock of stocks) {
        const ticker = stock.ticker;
        const stockData = await getTicker(ticker);
        if (!stockData) {
            continue;
        }
        if (today) {
            value += stock.shares * stockData.c;
        } else {
            value += stocks.shares * stockData.pc;
        }
    }
    return round(value);
}

const updateFromPreviousDay = async (stocks) => {

    const portfolioValue = await getStocksValue(stocks, true);
    const previosDayPortfolioValue = await getStocksValue(stocks, false);

    const changePercentage = ((portfolioValue / previosDayPortfolioValue) - 1) * 100
    const changeTotal = portfolioValue - previosDayPortfolioValue

    return {
        changePercentage: round(changePercentage),
        changeTotal: round(changeTotal)
    }
}

const getUserStockInformation = async (stocks) => {
    let stockInformations = [];

    for await (const stock of stocks)  {
        const {ticker, shares, price} = stock;
        const stockData = await getTicker(ticker);
        const stockPrice = stockData.data.c;

        const stockInformation = {
            currentPrice : stockPrice.toString(),
            ticker: ticker.toString().toUpperCase(),
            shares: shares.toString(),
            price: price.toString()
        }
        stockInformations.push(stockInformation);

    }
    return stockInformations;
}

const totalChange = async (stocks) => {
    return 0;
    // let portfolioValue = await currentPortfolioValue(data)
    // let total = 0

    // for await (const stock of data) {
    //    const { totalSpend } = stock
       
    //     total += totalSpend
    // }

    // const changeTotal = ((parseInt(portfolioValue) + parseInt(userData[0].cash) ) - 5000)
    // const changePercentage = (parseInt(changeTotal) / parseInt(total)) * 100

    // const res = {
    //     changePercentage: parseFloat(changePercentage).toPrecision(2),
    //     changeTotal: precise(changeTotal)
    // }
}

module.exports = {
    getStocksValue, updateFromPreviousDay, getUserStockInformation, totalChange
}