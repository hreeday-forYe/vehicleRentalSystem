const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
  title: String,
  description: String,
  phoneNumber: Number,
  photos: [String],
  RentDate : String,
  RentTill : String,
  price:Number
  
});
const VehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = VehicleModel;