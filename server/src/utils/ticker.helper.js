const axios = require('axios');
const NodeChache = require('node-cache');

const { FINHUB_API_KEY } = require('../config');
const nodeCache = new NodeChache({ stdTTL: 120 });

const getTicker = async (ticker) => {
    try {
        ticker = ticker.toUpperCase();
        if (nodeCache.has(ticker)) {
            return nodeCache.take(ticker);
        }

        const url = `https://finnhub.io/api/v1/quote?token=${FINHUB_API_KEY}&symbol=${ticker}`;

        const stockInfo = await axios.get(url);

        if (stockInfo.data.error) {
            return null;
        }

        return stockInfo.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = getTicker;
