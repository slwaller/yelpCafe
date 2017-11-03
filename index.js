const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_cafe")

//schema set up - will refactor and break up later
const cafeSchema = new mongoose.Schema({
    name: String,
    image: String
})

const Cafe = mongoose.model("Cafe", cafeSchema)

// Cafe.create(
//     {
//         name: "Calhoun Lounge",
//         image: "https://farm3.staticflickr.com/2826/9641299964_e4af33a207.jpg"
//     }, function(err, cafe){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("New Cafe", cafe)
//     }
// })

    // {
    //     name: "Lava Java",
    //     image: "https://farm3.staticflickr.com/2742/4327593145_f273d3fd53.jpg"
    // },
    // {
    //     name: "The Den",
    //     image: "https://farm4.staticflickr.com/3455/3237137264_84e618d70a.jpg"
    // }

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/cafes", function(req, res){
    //gt all cafes from db
    Cafe.find({}, function(err, cafes){
        if(err){
            console.log(err)
        } else {
            res.render("cafes", {cafes: cafes})
        }
    })

})

app.post("/cafes", function(req, res){
    const name = req.body.name
    const image = req.body.image
    const newCafe = {
        name: name,
        image: image
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

app.listen(3000, function(){
    console.log("Server up on port 3000!")
})