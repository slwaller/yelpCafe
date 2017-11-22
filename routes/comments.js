const express = require("express")
const router = express.Router({mergeParams: true})

const Cafe = require("../models/cafe")
const Comment = require("../models/comment")
const middleware = require("../middleware")

// Comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {cafe: cafe})
        }
    })

})

// Comment create
router.post("/", middleware.isLoggedIn, function(req, res){
    Cafe.findById(req.params.id, function(err, cafe){
        if(err){
            console.log(err)
            res.redirect("/cafes")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong")
                    res.redirect("back")
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    cafe.comments.push(comment)
                    cafe.save()
                    req.flash("success", "Comment added!")
                    res.redirect("/cafes/" + cafe._id)
                }
            })
        }
    })
})

// comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Cafe.findById(req.params.id, function(err, foundCafe){
        if(err || !foundCafe){
            req.flash("error", "Cafe not found")
            return res.redirect("back")
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            } else {
                res.render("comments/edit", {cafe_id: req.params.id, comment: foundComment})        
            }
        })
    })
})

// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/cafes/" + req.params.id)
        }
    })
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else {
            req.flash("success", "Comment removed")
            res.redirect("/cafes/" + req.params.id)
        }
    })
})


module.exports = router