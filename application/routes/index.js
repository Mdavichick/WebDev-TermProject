var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').UserIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
const db = require('../conf/database.js');


/* GET home page. */    // get request on this url path
// localhost: 3000
router.use('/', getRecentPosts);
router.get('/', function(req, res, next) {
  // res.render('index',{name:"Michael"});           // send html pages to front end (browser) - sendfile
    res.render("home", {title:"Home"});
});
//
// router.get('/home', function(req, res, next) {
//     // res.render('index',{name:"Michael"});           // send html pages to front end (browser) - sendfile
//     res.render("home", {title:"Home"});
// });

router.get('/login', (req,res,next)=> {
    res.render("login", {title:"Log In"});
});

router.get('/registration', (req,res,next)=> {
    res.render("registration", {title: "Register"});
});


router.use('/postimage',isLoggedIn);
router.get('/postimage', (req,res,next)=> {
    res.render("postimage", {title: "Post an Image"});
});

router.get('/homepage', (req,res,next)=> {
    res.render("homepage");
});

router.get('/imagepost', (req,res,next)=> {
    res.render("imagepost");
});

router.get('/home', (req,res,next)=> {
    res.render("home");
});

router.get("/post/:id(\\d+)",(req,res,next)=>{
    let baseSQL = "SELECT u.username, p.title, p.description, p.photopath, p.created FROM users u Join posts p ON u.id=fk_userid WHERE p.id = ?;"
    let postId = req.params.id;

    db.execute(baseSQL,[postId])
        .then(([results, fields])=>{
            if(results && results.length){
                let post = results[0];
                res.render('imagepost',{currentPost: post});
            }else{
                req.flash('error', 'This is not the post you are looking for!');
                res.redirect('/');
            }
        })

});


module.exports = router;
