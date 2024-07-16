const moment = require('moment');

const getDate = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    getDate
}