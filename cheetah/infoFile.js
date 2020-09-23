const mongoose = require('mongoose');


const fileSchema = mongoose.Schema({
    // name: {
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    meta_data:{}
});

module.exports = mongoose.model("file",fileSchema);