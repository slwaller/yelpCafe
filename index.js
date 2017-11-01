const express = require("express")
const app = express()


app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/cafes", function(req, res){
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
        },
        
    ]
    res.render("cafes", {cafes: cafes})
})
app.listen(3000, function(){
    console.log("Server up on port 3000!")
})