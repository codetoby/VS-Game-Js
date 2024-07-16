const getAvatarUrl = (userId, avatar) => {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.jpg`
}

module.exports = { getAvatarUrl };