const express = require('express');
const app = express();
// cors helps us to communicate with the different port 
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = "asdfasdwrtw1FFaFFsdG";
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const User = require("./models/User");
const Vehicle = require('./models/Vehicle');
const BookingModel = require('./models/Booking');

// app should use json parser from the express for the request to be successful
app.use(express.json());
app.use(cookieParser());

// defining the uploads root path
app.use('/uploads', express.static(__dirname +'/uploads'));
// our app should use cors for successfull routing
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// function to get the user data
function getUserDataFromReq(req){
  return new Promise((resolve, reject)=>{
    jwt.verify(req.cookies.token,jwtSecret,{},async (err, userData)=>{
      if(err) throw err;
      resolve(userData);
    })
  });
   
}

// Connecting our database with moongoose
mongoose.connect(process.env.MongoDB_URL);

app.get("/test", (req, res) => {
  res.json("test Ok");
});

// Grabbing the name email and password from register
app.post("/register", async (req, res) => {
  const {name,email,password,phone, address} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
      phone,
      address,

    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});


// for login Backend
app.post("/login", async (req,res)=>{
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
      jwt.sign({email:userDoc.email, id:userDoc._id,},jwtSecret,{}, (err, token)=>{
        if(err) throw err;
        res.cookie('token',token,{sameSite:'none', secure: true}).json(userDoc);
      });
    }else{
      res.status(422).json("password is not ok")
    }
  }else{
    res.json("not found");
  }
})



app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id,phone,address,role} = await User.findById(userData.id);
      res.json({name,email,_id,phone,address,role});
    });
  } else {
    res.json(null);
  }
});

// app.post('/logout', async (req,res)=>{
//   try {
//     res.clearCookie('token', {path:'/'}).json(true);
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

app.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token', { path: '/' });
    res.set('Cache-Control', 'no-store'); // Set cache control header
    res.json(true);
  } catch (error) {
    res.status(500).send(error)
  }
});


// add photo to database endpoint 
app.post('/upload-by-link', async(req,res)=>{
  const {link} = req.body;
  const newName = 'photo'+ Date.now() +'.jpg';
  await imageDownloader.image({
    url : link,
    dest: path.join(__dirname, 'uploads', newName)
  });
  res.json(newName);
})
// console.log(__dirname);


// defining our upload photos middle ware
const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array("photos",100), (req,res)=>{
  const uploadedFiles = []
  for(let i =0; i<req.files.length; i++){
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.')
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles);
})


// another end point 
app.post('/vehicles',(req,res)=>{
  const {token} = req.cookies;
  const {title, description, brand , phone, addedPhotos, price} = req.body;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    if(err) throw err;
     const vehicleDoc =  await Vehicle.create({
        owner: userData.id,
        title,
        brand,
        description,
        phone,
        photos:addedPhotos,
        price
      });
      res.json(vehicleDoc);
    });
});

// user-vehicles section
app.get('/user-vehicles',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    const {id} = userData;
    res.json(await Vehicle.find({owner:id}))
  })
  
})

// end point for each vehicles with their id

app.get('/vehicles/:id',async (req,res)=>{
  const {id} = req.params;
  res.json(await Vehicle.findById(id))
});



app.put('/vehicles',  async (req,res)=>{
  // const {id} = req.params;
  const {token} = req.cookies;
  const {id, title, description, phone, addedPhotos,  price,brand} = req.body;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    const vehicleDoc = await Vehicle.findById(id)
    if(userData.id === vehicleDoc.owner.toString()){
      vehicleDoc.set({
        title,
        description,
        phone,
        photos:addedPhotos,
        price,
        brand
      })
      await vehicleDoc.save();
      res.json("ok")
    }
  });
});

// Getting all the vehicles users and bookings
app.get('/vehicles',  async (req,res)=>{
  res.json(await Vehicle.find())
})
app.get('/users', async (req,res)=>{
  res.json(await User.find())
})
app.get('/all-bookings',  async (req,res)=>{
  res.json(await BookingModel.find().populate(['user','vehicle']));
})

// delete vehicle
app.delete('/bookings/:id', async (req, res) => {
  try {
    // console.log(req.params.id);
    await BookingModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully', });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
});
// delete vehicle
app.delete('/vehicles/:id', async (req, res) => {
  try {
    // console.log(req.params.id);
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted successfully', });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

app.post('/bookings',  async (req,res)=>{
  const userData = await getUserDataFromReq(req)
  const {vehicle, 
        rentDate, rentTill,
        name, phone,
        price, 
        payment} = req.body;
        try {
          const booking = await BookingModel.create({ vehicle, user:userData.id, rentDate, rentTill, name, phone, price, payment });
          res.json(booking);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Failed to create booking' });
        }
});



app.get('/bookings', async (req,res)=>{
  const userData =  await getUserDataFromReq(req);
  res.json(await BookingModel.find({user:userData.id}).populate('vehicle'))
  
});



app.listen(4000);




