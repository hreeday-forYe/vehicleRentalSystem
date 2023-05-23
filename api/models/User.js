const mongoose = require("mongoose");
const {Schema} = mongoose;
// definging the schema of the user
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 1, // customer
  },

  
},{ timestamps: true });

// creating the user model 
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;