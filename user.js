const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./usermodel");
//middle ware to parse the date coming from front end into human readable form.
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
//default route
app.get("/", (req,res)=>{
    res.render("index");
});
app.listen(8080);

//create user route.
app.post("/create", async (req,res)=>{
    // app.redirect("/");
     let {userName,email}=req.body;
   let createdUser = await userModel.create({userName:userName, email:email});
    res.send(createdUser);
});

// find all users route.
app.get("/read", async (req,res)=>{
    // app.redirect("/");
     let {userName,email}=req.body;
   let allUsers = await userModel.find();
    res.send(allUsers);
});

//update user route.
app.post("/edit", async(req,res)=>{
 let {userName, email} = req.body;
 let editedUser = await userModel.findOneAndUpdate({userName:userName} ,{email:email},{new:true});
 res.send(editedUser);
});

//delete user route.
app.post("/delete", async(req,res)=>{
    let {userName, email} = req.body;
    let deletedUser = await userModel.findOneAndDelete({userName:userName});
    res.send(deletedUser);
   });

//find a user route.
app.get("/filter", async(req,res)=>{
    let {userName} = req.query;
    let filteredUser = await userModel.findOne({userName:userName});
    res.send(filteredUser);
   });
