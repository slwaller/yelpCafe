const mongoose = require("mongoose")
const Cafe = require("./models/cafe")
const Comment = require("./models/comment")

const data = [
    {
        name: "Cafe Calhoun",
        image: "https://farm3.staticflickr.com/2742/4327593145_f273d3fd53.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Beans N Cream",
        image: "https://farm2.staticflickr.com/1091/539920018_9e15029497.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "The Lounge",
        image: "https://farm4.staticflickr.com/3793/14117188500_9452d50ac9.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "The Busy Bean",
        image: "https://farm4.staticflickr.com/3062/3046801881_ae515bc68c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "The Den",
        image: "https://farm8.staticflickr.com/7303/9290787529_a740e3eab2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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