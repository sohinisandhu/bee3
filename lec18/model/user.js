const mongoose=require('mongoose');
const blog = require('./blog');
const Schema=mongoose.Schema
const userpost=new Schema({
    username:String,
    email:String,
    password:String,
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blog"
    }]
});
module.exports=mongoose.model('User',userpost);