module.exports = {
    googleClidentID: process.env.GOOGLE_CLIENT_ID,
    googleClidentSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: 
    process.env.MONGO_URI,
    cookiekey: process.env.COOKIE_KEY,
    callbackURL:'https://frozen-ravine-23768.herokuapp.com/google/callback',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY
};

//mongodb+srv://myuser:lWKqZsLoIg0nt8XO@cluster0.nrvac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority