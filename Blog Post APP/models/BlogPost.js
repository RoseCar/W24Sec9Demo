const mongoose = require('mongoose')

const Schema = mongoose.Schema

//create shema

const BlogPostSchema = new Schema({
    title:String,
    description:String,
   // userName:String,
   userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
    datePosted : {
        type: Date,
        default: new Date()
    },
    imagePath:String
}) 

       const BlogPost = mongoose.model('BlogPost',BlogPostSchema)
       module.exports = BlogPost