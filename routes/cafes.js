const express = require("express")
const router = express.Router()

const Cafe = require("../models/cafe")
const Comment = require("../models/comment")

// Cafe Index Route
router.get("/", function(req, res){
    //gt all cafes from db
    Cafe.find({}, function(err, cafes){
        if(err){
            console.log(err)
        } else {
            res.render("cafes/index", {cafes: cafes})
        }
    })

})

// Post to Cafe Route when we create
router.post("/", function(req, res){
    const name = req.body.name
    const image = req.body.image
    const desc = req.body.description
    const newCafe = {
        name: name,
        image: image,
        description: desc
    }
    //create new cafe and save to db
    Cafe.create(newCafe, function(err, newCafe){
        if(err){
            console.log(err)
        } else {
            res.redirect("")
        }
    })
})

// Create Cafe
router.get("/new", function(req, res){
    res.render("cafes/new")
})

// Cafe Show Page
router.get("/:id", function(req, res){
    Cafe.findById(req.params.id).populate("comments").exec(function(err, foundCafe){
        if(err){
            console.log
        } else {
            console.log(foundCafe)
            res.render("cafes/show", {cafe: foundCafe})
        }
    })
})

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router