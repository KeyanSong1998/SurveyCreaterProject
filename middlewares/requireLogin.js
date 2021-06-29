module.exports = (req,res,next) => {
    if(!req.user) {
        return res.status(401).send ({error: "Log in with your google account before add Credit"})
    }
    next();
};
