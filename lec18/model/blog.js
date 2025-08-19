const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogPost = new Schema({
    title: String,
    body: String,
    date: Date,
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"user"
    }
  });
  //modelname ,schemaname
module.exports= mongoose.model('Blog', BlogPost);