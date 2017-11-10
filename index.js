const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

const Cafe = require("./models/cafe")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_cafe")

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/cafes", function(req, res){
    //gt all cafes from db
    Cafe.find({}, function(err, cafes){
        if(err){
            console.log(err)
        } else {
            res.render("index", {cafes: cafes})
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
    res.render("new")
})

app.get("/cafes/:id", function(req, res){
    Cafe.findById(req.params.id, function(err, foundCafe){
        if(err){
            console.log
        } else {
            res.render("show", {cafe: foundCafe})
        }
    })
})



app.listen(3000, function(){
    console.log("Server up on port 3000!")
})