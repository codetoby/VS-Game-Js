const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const { findUserByUserId, createUser, updateUser } = require('../../services/user.service');
const { getAvatarUrl } = require('../discord.helper');
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = require('../../config');

passport.serializeUser((user, done) => {
    return done(null, user.userId);
})

passport.deserializeUser(async (id, done) => {
    const find = await findUserByUserId(id);
    return find ? done(null, find) : done(null, null);
})

passport.use(
    new DiscordStrategy(
    {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: ["identify", 'email']
    },
        async (accessToken, refreshToken, profile, done) => {
            const { id, email, avatar, username } = profile;
 
            const avatarUrl = getAvatarUrl(id, avatar);
            const user = await findUserByUserId(id);
            if (user) {
                await updateUser(id, email, username, avatarUrl, accessToken, refreshToken);
                return done(null, user);
            } else {
                await createUser(id, email, username, avatarUrl, accessToken, refreshToken);
                const newUser = await findUserByUserId(id);
                return done(null, newUser);
            }
        }
    )
);