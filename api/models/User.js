const mongoose = require("mongoose");
const {Schema} = mongoose;
// definging the schema of the user
const userSchema = new Schema({
  name: String,
  email: {type:String,unique:true},
  password: String,
});

// creating the user model 
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;