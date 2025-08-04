const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello")
})
// let obj = {
//     name,
//     age:20,
// }

app.post("/user",(req,res)=>{
    // let{name,age} = req.body;
    // res.json({name,age});
    let arr = [];
    let name = req.body.name;
    let age = req.body.age;
    let user = {name,age};
    
    fs.readFile("./data.txt","utf-8",(err,data)=>{
   
    if(!err&&data!=""){
        arr = JSON.parse(data)
    }
    console.log(arr.push(user));
    
   
    console.log(arr);
    fs.writeFile("./data.txt",JSON.stringify(arr,null,2),(err1)=>{
        if(err1){
            return console.log(err1);
        }
        console.log("done")
    })
    

    })
  res.send("user added")
})
app.post("/register",(req,res)=>{
     })

app.listen(3000,()=>{
    console.log("server started");
})