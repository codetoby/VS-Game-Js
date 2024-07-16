const { findByUserId, insert } = require('../repositories/chart.repository');

const findUChartByUserId = async (userId) => {
  // const userPortfolioValues = await findByUserId(userId);
  let data = generateMockPortfolioValues(30);
  return data;
}

const generateMockPortfolioValues = (days) => {
  const userPortfolioValues = [];
  let baseValue = 100;

  for (let i = 0; i < days; i++) {
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - i);
    const valueChange = (Math.random() - 0.5) * 200;
    baseValue += valueChange;

    userPortfolioValues.push({
      timestamp: timestamp.toISOString().slice(0, 10),
      value: parseFloat(baseValue.toFixed(2))
    });
  }

  return userPortfolioValues.reverse();
};


const save = async (userId, value, timestamp) => {
  await insert(userId, value, timestamp);
}

module.exports = {
  findUChartByUserId,
  save
}