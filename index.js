const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// this will run the code inside
//since this file do not export anything, we just require it. 
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });


//what is app
    //this represent a running express app
    //express here is to listen the comming requests and routes to our routes handlers
const app = express();


// This part: Using cookie and show the user we put.
app.use(
    cookieSession({
        //30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookiekey]
    })
);
//middleware
app.use(passport.initialize());
app.use(passport.session());



// const authRoutes= require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);

//heroku open  heroku logs
//git status,
//git add .
//git commit -m "changing description"
// git push heroku master


// https://frozen-ravine-23768.herokuapp.com/ | https://git.heroku.com/frozen-ravine-23768.git
//This is for listen to dynamic routes from heroku.
//Heroku can inject enviroment variables 
const PORT = process.env.PORT|| 5000;  // default is 5000 (under development local machine)
app.listen(PORT);





