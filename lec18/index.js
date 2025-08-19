const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const Blogs=require("./model/blog")
const Users=require("./model/user")

app.post("/blogs",async(req,res)=>{
    let {title,body,userId}=req.body;
    let userExists=await Users.findById(userId);
    if(userExists){
      let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now(),
        userId:userId
    })
    await newBlog.save();
    userExists.blogs.push(newBlog._id);
    await userExists.save();
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully!!!"
    })
    }
})

app.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})

app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})

app.post("/users", async (req, res) => {
  let { email, username, password } = req.body;
  let newUser = new Users({
    email: email,
    username: username,
    password: password
  });
  await newUser.save();
  res.json({
    success: true,
    data: newUser,
    message: "user added successfully!!!"
  });
});

app.get("/users", async (req, res) => {
  let allUsers = await Users.find();
  res.json({
    success: true,
    data: allUsers
  });
});

app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  let user = await Users.findOne({ _id: id });
  res.json({
    success: true,
    data: user
  });
});
// delete blog
app.delete("/blogs/:blogId",async(req,res)=>{
  let {blogId} = req.params;
  let {userId} = req.body;
  if(!userId) return res.json({success:false,message:"user id is required"})
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog not exist"
  })
  if(blogExist.userId  != userId){
    return res.json({
      success:false,
      message:"You are not allowed to delete this blog"
    })
  }
  await Blogs.findByIdAndDelete(blogId);
  let userExists = await Users.findById(userId);
  let blog =userExists.blogs.filter((id)=>id!=blogId);
  userExists.blogs = blog;
  await userExists.save();
  res.json({
    success:true,
    message:"Blog deleted",
    data:userExists
    
  })

})
app.listen(3000,()=>{
    console.log("Server started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));