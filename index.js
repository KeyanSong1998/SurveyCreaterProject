const express = require('express');

// this will run the code inside the passport
//since this file do not export anything, we just require it. 
require('./services/passport');

//what is app
    //this represent a running express app
    //express here is to listen the comming requests and routes to our routes handlers
const app = express();


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



