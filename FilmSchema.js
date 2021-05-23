const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const filmSchema= new Schema({
    name:{
        type: String,
        required : true
    },
    cover:{
        type:String,
        required:true
    },
    boxOffice:{
        type: Number,
        required : true
    },
    rating:{
        type: Number, 
        required : true
    },
    directors:{
        type: Array, 
        required : true
    }
},{timestamps:true});//passing a constructor here

//craeting a mode based on tht  object
const Film= mongoose.model('films',filmSchema);
//books is Collection
module.exports=Film;