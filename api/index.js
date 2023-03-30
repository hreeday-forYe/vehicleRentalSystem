const express = require('express');
const app = express();
// cors helps us to communicate with the different port 
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/User");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = "asdfasdwrtw1FFaFFsdG";
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Vehicle = require('./models/Vehicle')
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

// Connecting our database with moongoose
mongoose.connect(process.env.MongoDB_URL);

app.get("/test", (req, res) => {
  res.json("test Ok");
});

// Grabbing the name email and password from register
app.post("/register", async (req, res) => {
  // mongoose.connect(process.env.MONGODB_URL);
  const {name,email,password} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
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

// code for /profile path backend

app.get('/profile',(req,res)=>{
  // console.log("Received request to /profile");
  const{token} = req.cookies;
  // console.log("Token:", token);
  if(token){
    jwt.verify(token,jwtSecret,{},async (err, userData)=>{
      if(err) {
        console.error(err);
        res.json(null);
      } 
      const {name,email, _id} = await User.findById(userData.id)
      res.json({name, email, _id})
    })
  } else {
    console.log("No token found");
    res.json(null);
  }
})



app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true);
})



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
  const {title, description, phoneNumber, addedPhotos, RentDate, RentTill, price} = req.body;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    if(err) throw err;
     const placeDoc =  await Vehicle.create({
        owner: userData.id,
        title,
        description,
        phoneNumber,
        photos:addedPhotos ,
        RentDate,
        RentTill,
        price
      });
      res.json(placeDoc);
    });
});
app.get('/user-vehicles',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    const {id} = userData;
    res.json(await Vehicle.find({owner:id}))
  })
  
})

app.get('/vehicles/:id',async (req,res)=>{
  const {id} = req.params;
  res.json(await Vehicle.findById(id))
})

app.put('/vehicles', async (req,res)=>{
  // const {id} = req.params;
  const {token} = req.cookies;
  const {id, title, description, phoneNumber, addedPhotos, RentDate, RentTill, price} = req.body;
  jwt.verify(token,jwtSecret,{},async (err, userData)=>{
    const vehicleDoc = await Vehicle.findById(id)
    if(userData.id === vehicleDoc.owner.toString()){
      vehicleDoc.set({
        title,
        description,
        phoneNumber,
        photos:addedPhotos ,
        RentDate,
        RentTill,
        price
      })
      await vehicleDoc.save();
      res.json("ok")
    }
  });
});

app.get('/vehicles',async (req,res)=>{
  res.json(await Vehicle.find())
})

app.listen(4000);




