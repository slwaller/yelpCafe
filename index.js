const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_cafe")
//DUMMY DATA FOR NOW
const cafes = [
    {
        name: "Beans N Cream",
        image: "https://farm3.staticflickr.com/2002/2431818545_bc3de6e0fd.jpg"
    },
    {
        name: "Lava Java",
        image: "https://farm3.staticflickr.com/2742/4327593145_f273d3fd53.jpg"
    },
    {
        name: "Calhoun Lounge",
        image: "https://farm3.staticflickr.com/2826/9641299964_e4af33a207.jpg"
    },
    {
        name: "The Den",
        image: "https://farm4.staticflickr.com/3455/3237137264_84e618d70a.jpg"
    }
]

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/cafes", function(req, res){

    res.render("cafes", {cafes: cafes})
})

app.post("/cafes", function(req, res){
    const name = req.body.name
    const image = req.body.image
    const newCafe = {
        name: name,
        image: image
    }
    cafes.push(newCafe)
    res.redirect("/cafes")
})

app.get("/cafes/new", function(req, res){
    res.render("new")
})

app.listen(3000, function(){
    console.log("Server up on port 3000!")
})