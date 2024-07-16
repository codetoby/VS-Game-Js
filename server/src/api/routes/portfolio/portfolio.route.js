const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const { initializePortfolio, findWallet, findPortfolioByUserId } = require('../../../services/portfolio.service');
const { getStocksValue } = require('../../../utils/portfolio.helper');

const router = express.Router()

router.get("/:userId", isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const findUser = await findWallet(userId);
        if (!findUser) {
            return res.status(404).send({ message: "User not found" })
        }
        const portfolio = await findPortfolioByUserId(userId);
        if (!portfolio) {
            return res.status(404).send({ message: "Portfolio not found" })
        }
        const stocksValue = await getStocksValue(portfolio, true);
        const data = {
            stocks: portfolio,
            cash: findUser.cash,
            portfolio: stocksValue
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.body
        const portfolio = await initializePortfolio(userId);
        if (portfolio) {
            return res.status(200).send({ success: true })
        }
        return res.status(200).send({ success: false })
    } catch (error) {
        next(error)
    }
})



// router.get('/:userid', async (req, res) => {
//     try {
//         const userid = req.params.userid

//         const findUser = await checkUser(userid)
//         if (findUser.message) {
//             res.send(findUser)
//             return
//         }

//         conn = await getPool()

//         const userStocks = await conn.query(`SELECT stockticker, shares, buyprice, totalSpend FROM alluserstocks WHERE userid=?`, [userid])
//         const userData = await conn.query(`SELECT cash, portfolio FROM userdata WHERE userid=?`, [userid])
//         const resData = {
//             cash: userData[0].cash,
//             portfolio: userData[0].portfolio
//         }
//         if (userStocks.length === 0) {
//             let response = {
//                 message: "No Stocks Found"
//             }
//             res.send({ message: response.message, userdata: resData })
//             return
//         } else {
//             const portfolioValue = await currentPortfolioValue(userStocks)
//             const updatePreviousDayChange = await updatePreviousDay(userStocks)
//             const totalChangeLT = await totalChange(userStocks, userData)
//             const userDataStock = await userStockData(userStocks)
//             res.send({ portfolio: portfolioValue, updatePreviousDayChange, totalChangeLT, userDataStock, userdata: resData })
//         }
//     } catch (error) {
//         console.log(error.response.data.error)
//     }


// })


module.exports = router