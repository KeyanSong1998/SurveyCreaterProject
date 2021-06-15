//this two is used for google login Authentication. 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');


passport.use(new GoogleStrategy({
    clientID: keys.googleClidentID,
    clientSecret: keys.googleClidentSecret,
    callbackURL: ' /auth/google/callback'
    },(accessToken,refreshToken,profile,done) =>{
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    })
);