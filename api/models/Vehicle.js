const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
  title: String,
  brand: String,
  description: String,
  phone: Number,
  photos: [String],
  price:Number,
  
});
const VehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = VehicleModel;