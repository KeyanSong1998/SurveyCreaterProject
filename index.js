const express = require('express');

//what is app
    //this represent a running express app
    //express here is to listen the comming requests and routes to our routes handlers
const app = express();


//explain of app.get method and route handler
    //app.get, calling this will create a route handler
    // '/' represent the route of the visit (浏览器里的地址)
    //

app.get('/',() =>{

});

//This is for listen to dynamic routes from heroku.
//Heroku can inject enviroment variables 
const PORT = process.env.PORT|| 5000;  // default is 5000 (under development local machine)
app.listen(PORT);

