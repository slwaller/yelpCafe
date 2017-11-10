const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

const Cafe = require("./models/cafe")
const Comment = require("./models/comment")
const seedDB = require("./seeds")


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_cafe")
seedDB()

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/cafes", function(req, res){
    //gt all cafes from db
    Cafe.find({}, function(err, cafes){
        if(err){
            console.log(err)
        } else {
            res.render("cafes/index", {cafes: cafes})
        }
    })

})

app.post("/cafes", function(req, res){
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
            res.redirect("/cafes")
        }
    })
})

app.get("/cafes/new", function(req, res){
    res.render("cafes/new")
})

app.get("/cafes/:id", function(req, res){
    Cafe.findById(req.params.id).populate("comments").exec(function(err, foundCafe){
        if(err){
            console.log
        } else {
            console.log(foundCafe)
            res.render("cafes/show", {cafe: foundCafe})
        }
    })
})

// Comments Routes

app.get("/cafes/:id/comments/new", function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {cafe: cafe})
        }
    })

})

app.post("/cafes/:id/comments", function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
            res.redirect("/cafes")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    cafe.comments.push(comment)
                    cafe.save()
                    res.redirect("/cafes/" + cafe._id)
                }
            })
        }
    })
})


app.listen(3000, function(){
    console.log("Server up on port 3000!")
})