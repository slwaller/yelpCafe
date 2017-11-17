const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const app = express()

const User = require("./models/user")
const Cafe = require("./models/cafe")
const Comment = require("./models/comment")
const seedDB = require("./seeds")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost/yelp_cafe")
// seedDB()

// ROUTES /////////////////
const commentRoutes = require("./routes/comments")
const cafeRoutes = require("./routes/cafes")
const authRoutes = require("./routes/auth")

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Psst secrets",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(authRoutes)
app.use("/cafes/:id/comments", commentRoutes)
app.use("/cafes", cafeRoutes)

app.get("/", function(req, res){
    res.render("landing")
})


app.listen(3000, function(){
    console.log("Server up on port 3000!")
})