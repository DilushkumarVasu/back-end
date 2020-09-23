const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const InfoRouter = require('./infoSchema'); 
const FileRouter = require("./infoFile");
// const path = require("path");
const multer = require("multer");
// require("./infoFile");
// const File = mongoose.model("file");


//file uploading setion start
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
 
 var upload = multer({ 
    storage: storage,
    limits:{fileSize: 1000000},
  }).single('file')


  router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        const file = new FileRouter();
        // file.name = req.body.name;
        file.meta_data = req.file;
        file.save().then(()=>{
        res.send({message:"uploaded successfully"})
        })

    });

});
//file uploading section finish

//Create
router.post("/",async (req,res)=>{
    //console.log(req.body);
    var data = new InfoRouter({
        Name:req.body.Name,
        Age:req.body.Age,
        City:req.body.City
    });
    await data.save();

    res.json(data);
});

//Update
router.put("/update",async (req,res)=>{
    var update = await InfoRouter.update({_id:req.body._id},{$set:{
        Name:req.body.Name,
        Age:req.body.Age,
        City:req.body.City
    }});

    res.json(update);
});

//Delete
router.delete("/del/:id",async (req,res)=>{
    var delData = await InfoRouter.findByIdAndRemove(req.params.id).then(e=>{
        res.json({message:"Deleted Successfully"})
    });
});

//getAll
router.get("/",async (req,res)=>{
    var findData = await InfoRouter.find();
    res.json(findData);
});

router.get('/',(req,res)=>{
    res.json("I am from router file");
});

module.exports = router;
