const fs = require('fs');
const express=require('express');
const app=express();
const multer=require('multer')
app.set("view engine","ejs"); 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");

    },
    filename:function(req,file,cb){
        return cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload = multer({storage})
app.use(express.urlencoded({extended:false})) //urlencoded helps us to form data ko parse krta ha form to json 
app.get("/",(req,res)=>{
    //res.send("Hello akshad");
    res.render("multer");
})
app.post("/upload",upload.single("profile"),(req,res)=>{  //for multiple pic we have to write array
console.log(req.file);
})
app.listen(3000,()=>{
    console.log("Server is Started at localhost:3000")
})



//for uploading the file we use multer 
const express = require("express");
const multer = require("multer");

const app = express();

// Folder where images will be saved
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Allow only 5 images
const upload = multer({
  storage: storage,
  limits: { files: 5 } // only 5 files allowed
});

// Route for uploading multiple images
app.post("/upload", upload.array("images", 5), (req, res) => {
  res.send(" Images uploaded successfully!");
});

// Handle error when more than 5 images uploaded
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).send(" You can upload up to 5 images only!");
  }
  res.status(500).send(err.message);
});

// Start server
app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});


