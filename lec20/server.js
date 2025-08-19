const express = require("express");
const app = express();
const {m1,m2} = require("./middleware/firstMiddleware");
const {m3,m4} = require("./middleware/pathLevel");
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(m1);


app.get("/",(req,res)=>{
    res.send("hi")
})
app.get("/health",(req,res,next)=>{
    console.log("running controller function")
    res.json({
        status:"ok",
        message:"server running ok"
    })
    next()
    //next or return not same
    //response k baad kuch na chale iskeliye return ka use karte heh
})
app.get("/home",m3,(req,res,next)=>{
    console.log("running controller function")
    res.json({
        success:true,
        message:"server running ok"
    })

    
})
app.use(m2);
app.listen(3000,()=>{
    console.log("Server connected");
})