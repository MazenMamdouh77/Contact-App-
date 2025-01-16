const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  Name:{type:String, required:[true,"Please Add Contact Name"]},
  Phone:{type:Number, required:[true,"Please Add Phone Number"]},
  Email:{type:String, required:[true,"Please Add Email"]},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Contact", contactSchema)