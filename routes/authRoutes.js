const passport = require('passport');


module.exports = (app) =>{
//explain of app.get method and route handler
    //app.get, calling this will create a route handler
    // '/' represent the route of the visit (浏览器里的地址)
    //
    app.get(
        '/auth/google', 
        passport.authenticate('google',{ //this google is created by new GoogleStrategy above
        scope:['profile', 'email'] // ask google for user profile and email info
        })
    );
    
    // this request will have authorized code and google give us the profile info of user we need
    app.get('/auth/google/callback', passport.authenticate('google'));
};

    