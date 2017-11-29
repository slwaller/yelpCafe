const mongoose = require("mongoose")

const cafeSchema = new mongoose.Schema({
    name: String,
    address: String,
    lat: Number,
    lng: Number,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const Cafe = mongoose.model("Cafe", cafeSchema)

// Cafe.create(
//     {
//         name: "Grind House",
//         image: "https://farm2.staticflickr.com/1331/539742161_2b0aed7190.jpg",
//         description: "Terrific coffee, terrific WiFi"
//     },
//     function(err, cafe){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("New: ", cafe)
//         }
//     }
// )

module.exports = Cafe