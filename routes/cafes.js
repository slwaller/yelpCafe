const express = require("express")
const router = express.Router()

const Cafe = require("../models/cafe")
const middleware = require("../middleware")

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
router.post("/", middleware.isLoggedIn, function(req, res){
    const name = req.body.name
    const image = req.body.image
    const desc = req.body.description
    const address = req.body.address
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCafe = {
        name: name,
        image: image,
        address: address,
        description: desc,
        author: author
    }
    //create new cafe and save to db
    Cafe.create(newCafe, function(err, newCafe){
        if(err){
            console.log(err)
        } else {
            res.redirect("/cafes")
        }
    })
})

// Create Cafe
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("cafes/new")
})

// Cafe Show Page
router.get("/:id", function(req, res){
    Cafe.findById(req.params.id).populate("comments").exec(function(err, foundCafe){
        if(err || !foundCafe){
            req.flash("error", "Cafe not found")
            res.redirect("back")
        } else {
            res.render("cafes/show", {cafe: foundCafe})
        }
    })
})

// Edit cafe

router.get("/:id/edit", middleware.checkCafeOwnership, function(req, res){
    Cafe.findById(req.params.id, function(err, foundCafe){
        res.render("cafes/edit", {cafe: foundCafe})
    })
})

// Update cafe
router.put("/:id", middleware.checkCafeOwnership, function(req, res){
    Cafe.findByIdAndUpdate(req.params.id, req.body.cafe, function(err, updatedCafe){
        if(err){
            res.redirect("/cafes")
        } else {
            res.redirect("/cafes/" + req.params.id)
        }
    })
})

//Delete Cafe

router.delete("/:id", middleware.checkCafeOwnership, function(req, res){
    Cafe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Something went wrong")
            res.redirect("/cafes")
        } else {
            req.flash("success", "Cafe Deleted")
            res.redirect("/cafes")
        }
    })
})

module.exports = router