const Cafe = require("../models/cafe")
const Comment = require("../models/comment")

const middlewareObj = {}

middlewareObj.checkCafeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Cafe.findById(req.params.id, function(err, foundCafe){
            if(err){
                res.redirect("back")
            } else {
            if(foundCafe.author.id.equals(req.user._id)) {
                next()
            } else {
                res.redirect("back")
            }
        }
    })
    } else {
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            } else {
            if(foundComment.author.id.equals(req.user._id)) {
                next()
            } else {
                res.redirect("back")
            }
        }
    })
    } else {
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = middlewareObj