const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicle: {type: mongoose.Schema.Types.ObjectId, required:true, ref:"Vehicle"},
  user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
  rentDate: {type:Date},
  rentTill: {type:Date},
  name: {type:String},
  phone: {type:String},
  price: Number,
  payment: {type:String}
});

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel 