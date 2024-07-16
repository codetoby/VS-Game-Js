const { insert, findByUserId, update } = require('../repositories/user.repository');

const createUser = async (userId, email, username, avatarUrl, accessToken, refreshToken) => {
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