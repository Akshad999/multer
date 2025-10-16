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


