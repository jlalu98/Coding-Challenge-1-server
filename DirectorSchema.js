const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const DirectorSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
   
    cover:{
        type:String,
        required:true
    },
    awardCount:{
        type:Number,
        required:true
    },
    films:{
        type:Array,
        required:true
    }
},{timestamps:true});

const Director=mongoose.model('directors',DirectorSchema);
module.exports=Director;