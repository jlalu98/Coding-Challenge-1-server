  const express=require("express");
const cors=require('cors');
const app= express();
const Director=require('./DirectorSchema');
const Film=require("./FilmSchema");
const mongoose= require('mongoose');
const { response } = require("express");
const dbURI="mongodb+srv://user_1:Jeni98@cluster0.r2jbq.mongodb.net/test1?retryWrites=true&w=majority";


const port =8000;
// app.use(cors());
// app.use(express.json());
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>console.log('Connected Successfully to DataBase'))
.catch((err)=>console.log(err));
app.use(cors());
app.use(express.json());
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
});


app.get("/directors",(req,res)=>{
    Director.find()
    .then((directors)=>{
        res.send(directors)
    }).catch((err)=>console.log("Error",err));
})


app.get("/films",(req,res)=>{
    Film.find()
    .then((films)=>{
        res.send(films)
    }).catch((err)=>console.log("Error",err));
})

app.post('/directors',(req,res)=>{
    let director=new Director(req.body);
    director.save();
    res.send(director);
});


app.patch("/directors/:name",async(req,res)=>{
    try{
    let director=Film.findOne({name:req.params.name})
    if(req.body.age===director.age||req.body.awardCount===director.awardCount)
        res.send("InvalidDataException")
    if(req.body.age)
        director.age=req.body.age;
    if(req.body.awardCount)
        director.awardCount=req.body.awardCount;
    if(req.body.gender!==director.gender)
        res.send("Cannot update gender")
    
    const d=await director.save();
    res.json(d);
    }  
    catch(err){
        res.send("Patch error")
    }      
})

app.post("/films",(req,res)=>{
    let film=new Film(req.body);
    film.save();
    res.send(film);
})


app.delete("/films/:name",async(req,res)=>{
 try{
     const name=req.params.name;
     const film=await Film.findOne({name:name});
     const films=await film.deleteOne({name});
     res.send(films);
 }
 catch(err){
    console.log(err);
    res.send("Film not found");
 }
})


app.get("/directors/films/:name",async(req,res)=>{
    try{
        const name=new RegExp(req.params.name,"i");
        let films=await Director.find({films:name});
        console.log(films);
        res.send(films)
    }
    catch(err){
        res.send("Film for that director not found!!");
    }
});

app.get("/films/directors/:name",async(req,res)=>{
    try{
        const name=new RegExp(req.params.name,"i");
        let directors=await Film.find({directors:name});
        console.log(directors);
        res.send(directors)
    }
    catch(err){
        res.send("Director for that film not found!!");
    }
});

app.get("/films/:name",async(req,res)=>{
    try{
        const name=new RegExp(req.params.name,"i");
        let film=await Film.find({name});
        // console.log(film.directors[0]);
        res.send(film)
    }
    catch(err){
        res.send("Film not found!!");
    }
});