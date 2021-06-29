const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
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


//Whenever a post or put or patch have a request body, this will parser the body into
//req.body 
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
//heroku open  heroku logs
//git status,
//git add .
//git commit -m "changing description"
// git push heroku master

//Below code are used to ensure when run at heroku, express recognize all routes 
//(There can be express request, or redux routes handler and files request made by npm build)

if(process.env.NODE_ENV === 'production'){
    //if we have any routes that we do not recognize, we look up client build
    //look for main.js file, or main.css file
    app.use(express.static('client/build'));

    //Then we will go for index.html file.

    const path = require('path');
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}





// https://frozen-ravine-23768.herokuapp.com/ | https://git.heroku.com/frozen-ravine-23768.git
//This is for listen to dynamic routes from heroku.
//Heroku can inject enviroment variables 
const PORT = process.env.PORT|| 5000;  // default is 5000 (under development local machine)
app.listen(PORT);





