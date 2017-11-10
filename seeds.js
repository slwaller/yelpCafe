const mongoose = require("mongoose")
const Cafe = require("./models/cafe")
const Comment = require("./models/comment")

const data = [
    {
        name: "Cafe Calhoun",
        image: "https://farm3.staticflickr.com/2742/4327593145_f273d3fd53.jpg",
        description: "This is the best coffee and meeting spot in town!"
    },
    {
        name: "Beans N Cream",
        image: "https://farm2.staticflickr.com/1091/539920018_9e15029497.jpg",
        description: "Good coffee, good music, great atmosphere for meetings and work!"
    },
    {
        name: "The Lounge",
        image: "https://farm4.staticflickr.com/3793/14117188500_9452d50ac9.jpg",
        description: "Free WiFi and voted best cafe bakery in town!"
    },
    {
        name: "The Busy Bean",
        image: "https://farm4.staticflickr.com/3062/3046801881_ae515bc68c.jpg",
        description: "Quaint little coffee shop to suit all your needs"
    },
    {
        name: "The Den",
        image: "https://farm8.staticflickr.com/7303/9290787529_a740e3eab2.jpg",
        description: "Come relax at The Den where we have all your relaxation needs"
    }
]

function seedDB(){
    //remove all cafes
    Cafe.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("DB Cleared!")
        data.forEach(function(seed){
            Cafe.create(seed, function(err, cafe){
                if(err){
                    console.log("Error!!", err)
                } else {
                    console.log("Cafe Added")
                    //create comment
                    Comment.create({
                        text: "This place is amazing!",
                        author: "Harry"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            cafe.comments.push(comment)
                            cafe.save()
                            console.log("created comment!")
                        }
                    })
                }
            })
        })
    })
}

module.exports = seedDB