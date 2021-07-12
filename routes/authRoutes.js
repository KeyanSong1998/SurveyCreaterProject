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
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/surveys'); //tell the response to redirect to other routes.
        }
        );

    app.get('/api/logout',(req,res) => {
        // logout is attach automaticlly in req by passport.
        // it will kills the id in cookie
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user',(req,res) =>{
        res.send(req.user); // source of the user see passport.js 
    });
};

    