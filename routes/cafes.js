const express = require("express")
const geocoder = require("geocoder")
const router = express.Router()

const Cafe = require("../models/cafe")
const middleware = require("../middleware")

// Cafe Index Route
router.get("/", function(req, res){
    //get all cafes from db
    Cafe.find({}, function(err, allCafes){
        if(err){
            console.log(err)
        } else {
            res.render("cafes/index", {cafes: allCafes})
        }
    })
})

//CREATE - add new cafe to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to cafes array
    const name = req.body.name
    const image = req.body.image
    const desc = req.body.description
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.address, function (err, data) {
        console.log("DATAAAAAAA", data.results[0])
        const lat = data.results[0].geometry.location.lat
        const lng = data.results[0].geometry.location.lng
        const address = data.results[0].formatted_address
        const newCafe = {
            name: name, 
            image: image, 
            description: desc, 
            author: author, 
            address: address, 
            lat: lat, 
            lng: lng
        }
        // Create a new Cafe and save to DB
        Cafe.create(newCafe, function(err, newlyCreated){
            if(err){
                console.log(err)
            } else {
                //redirect back to cafes page
                console.log(newlyCreated)
                res.redirect("/cafes")
            }
        })
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
router.put("/:id", function(req, res){
    geocoder.geocode(req.body.address, function (err, data) {
        const lat = data.results[0].geometry.address.lat
        const lng = data.results[0].geometry.address.lng
        const address = data.results[0].formatted_address
        const newData = {
            name: req.body.name, 
            image: req.body.image, 
            description: req.body.description, 
            address: address, 
            lat: lat, 
            lng: lng
        }
        Cafe.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, cafe){
            if(err){
                req.flash("error", err.message)
                res.redirect("back")
            } else {
                req.flash("success","Successfully Updated!")
                res.redirect("/cafes/" + cafe._id)
            }
        })
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