const cron = require('node-cron');
const portfolioTask = require('./portfolioTask');

cron.schedule('0 0 * * *', async () => {
    await portfolioTask();
});