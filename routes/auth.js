const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user")

router.get("/register", function(req, res){
    res.render("register")
})

router.post("/register", function(req, res){
    const username = req.body.username
    const newUser = new User({
        username: username
    })
    const password = req.body.password
    User.register(newUser, password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/cafes")
        })
    })
})

router.get("/login", function(req, res){
    res.render("login")
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/cafes",
        failureRedirect: "/login"
    }), function(req, res){
    }
)

router.get("/logout", function(req, res){
    req.logout()
    res.redirect("/cafes")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router