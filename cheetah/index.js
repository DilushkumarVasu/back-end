//Thired party module
const express = require('express');
const mongoose =  require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const multer = require("multer");


const app = express();

// app.use("/",(req,res)=>{
//     res.json("Hi friends");
// })

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Router
const infoRouter = require('./router');
app.use("/info",infoRouter);

//Listen port
app.listen(5000,()=>{
    console.log("Server started on port number 5000");
})

// Databse connections
mongoose.connect("mongodb://localhost/tutorial",{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log("DB Connected Successfully");
    }
})