const { insert } = require("../repositories/chart.repository");
const { getAllUsers, findPortfolioById } = require("../services/portfolio.service");
const { getDate } = require("../utils/date.helper");
const { getStocksValue } = require("../utils/portfolio.helper");

const task = async () => {
    const users = await getAllUsers();
    for (const user of users) {
        const portfolio = await findPortfolioById(user.userId);
        const portfolioValue = await getStocksValue(portfolio, true);
        await insert(user.userId, portfolioValue, getDate());
    }
}

module.exports = task;
