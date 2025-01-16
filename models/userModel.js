const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"User name missing"]
    },
    email: {
        type: String,
        required: [true,"Please Add The Email"],
        unique: [true,"Email Address Already Taken"]
    },
    password: {
        type: String,
        required: [true, "Password missing"]
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User",userSchema);