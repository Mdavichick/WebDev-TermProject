const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const routeProtectors = {};

routeProtectors.UserIsLoggedIn = function(req,res,next){
    if(req.session.username){
        successPrint('User is logged in');
        next();
    }else{
        errorPrint('User is not logged in!');
        req.flash('error', 'You must be logged in to create a Post!');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;