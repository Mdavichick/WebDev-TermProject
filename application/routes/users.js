var express = require('express');
var router = express.Router();
const db = require('../conf/database.js');
const UserError = require("../helpers/error/UserError");
var {errorPrint,successPrint} = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');
/* GET users listing. */

// // localhost: 3000/users
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//localhost:3000/users/registers
router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    // do server side validation not done in video
    // need to make sure email and username are unique

    db.execute("SELECT * FROM users WHERE username=?",[username])  // if this returns one row, get out
    .then(([results,fields])=>{
        if(results && results.length ==0){
            return db.execute("SELECT * FROM users WHERE email = ?", [email]);
        }else{
            throw new UserError("Registration Failed: Username already exists",
                "/registration",
                200
            );
        }
    })
        .then(([results,fields]) =>{
            if(results && results.length ==0){
                 return bcrypt.hash(password,10);
            }else{
                throw new UserError(
                    "Registration Failed: Email already exists",
                    "/registration",
                    200
                );
            }
        })
        .then((hashedPassword) => {

                let baseSQL = "INSERT INTO users (username,email,password,created) VALUES (?,?,?,now());"
                return db.execute(baseSQL,[username,email,hashedPassword]);       // try to create new user

        })
        .then(([results, fields]) => {
            if (results && results.affectedRows){
                successPrint("User.js --> user was created");
                req.flash('success','User account has been made!');
                res.redirect('/login');
            }else{
                throw new UserError("Server Error, user could not be created",
                    "/registration",
                    500
                );
            }
        })
        .catch((err) => {
            errorPrint("user could not be made",err);
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                req.flash('error',err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }
            else{
                next(err);
            }
        })
});

router.post('/login',(req,res,next)=>{
    let username = req.body.username;
    let password = req.body.password;


    let baseSQL = "SELECT id,username, password FROM users WHERE username=?;"
    let userId;
    db.execute(baseSQL,[username])
        .then(([results,fields])=>{
            if(results && results.length == 1){
                let hashedPassword = results [0].password;
                userId = results[0].id;
                return bcrypt.compare(password,hashedPassword);
            }else{
                throw new UserError("Invalid username and/or password!","/login",200);
            }
        })
        .then((passwordsMatched) =>{
            if (passwordsMatched){
                successPrint(`User ${username} is logged in`);      // if successful
                req.session.username = username;
                req.session.userId = userId;
                res.locals.logged = true;
                // res.render('home');// redirect to homepage
                req.flash('success', 'You have been successfully logged in!');
                req.session.save(err=>{
                res.redirect('/home');})

            }else{
                throw new UserError("Invalid username and/or password!","/login",200);
            }
        } )
        .catch((err)=> {
            errorPrint("user login failed");
            if(err instanceof UserError){
                errorPrint(err.getMessage());
                req.flash('error',err.getMessage());
                res.status(err.getStatus());
                res.redirect('/login');
            }else{
                next(err);
            }
        })
})

router.post('/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            errorPrint('session could not be destroyed');
            next(err);
        }
        else{
            successPrint('Session was destroyed');
            res.clearCookie('csid');
            res.json({status:"Ok",
            message:"user is logged out"});
        }
    })
});


module.exports = router;


