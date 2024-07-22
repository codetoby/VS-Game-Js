const { insert, findByUserId, update } = require('../repositories/user.repository');
const { initializePortfolio } = require('./portfolio.service');

const createUser = async (userId, email, username, avatarUrl, accessToken, refreshToken) => {
    await initializePortfolio(userId);
    return await insert(userId, email, username, avatarUrl, accessToken, refreshToken);

}

const findUserByUserId = async (userId) => {
    const [user] = await findByUserId(userId);
    return user;
}

const updateUser = async (userId, email, username, avatarUrl, accessToken, refreshToken) => {
    await update(userId, email, username, avatarUrl, accessToken, refreshToken);
}


module.exports = { createUser, findUserByUserId, updateUser };