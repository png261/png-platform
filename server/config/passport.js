const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const rug = require('random-username-generator');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'api/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const randomUsername = async () => {
                    const username = rug.generate;
                    const isExistUsername = await User.findOne({ username });
                    return isExistUsername ? randomUsername() : username;
                };

                const username = await randomUsername();

                const newUser = {
                    _id: profile.id,
                    email: profile.email,
                    username,
                };

                try {
                    const isExistUser = await User.findOne({ _id: profile.id });

                    if (isExistUser) {
                        done(null, user);
                    } else {
                        const user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
