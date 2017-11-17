const express = require("express")
const router = express.Router({mergeParams: true})

const Cafe = require("../models/cafe")
const Comment = require("../models/comment")

// Comment form
router.get("/new", isLoggedIn, function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {cafe: cafe})
        }
    })

})

// Comment create
router.post("/", isLoggedIn, function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
            res.redirect("/cafes")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    cafe.comments.push(comment)
                    cafe.save()
                    res.redirect("/cafes/" + cafe._id)
                }
            })
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