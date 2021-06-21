//this two is used for google login Authentication. 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');



//Those two are passport middleWare. 
    //About done();
        // The first argument into done is error object, (if we have any error messages)
        //
    // The user we pass in is the user we passed in done() in passport.use.
passport.serializeUser((user,done) =>{
    done(null,user.id);
});

//the user in done(), will be added into req object as req.user
passport.deserializeUser((id,done) =>{
    User.findById(id)
        .then(user =>{
            done(null,user);
        });    
});



passport.use(new GoogleStrategy({
    clientID: keys.googleClidentID,
    clientSecret: keys.googleClidentSecret,
    callbackURL: '/auth/google/callback',
    key:'AIzaSyDG3xjyadwIyuILKJkGwE4F-sqmp6dQBs8',
    proxy: true
    },(accessToken,refreshToken,profile,done) =>{
        //After we loging, we add the returned user information into mongoDB
        User.findOne({googleId:profile.id})
            .then((exsitingUser) =>{
                if(exsitingUser){
                    //if we already have a user
                    done(null,exsitingUser);
                }else{
                    new User({googleId: profile.id}).save()
                        .then(user => done(null,user)); // we pass the user for serilaizeUser further. 
                }
            })
        
    })
);