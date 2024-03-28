const BlogPost = require('../models/BlogPost')
module.exports= async (req,res)=>{
    console.log(req.session)
    const blogposts = await BlogPost.find({}).populate('userid')
    console.log(`My All Post Data >>> ${blogposts}`)
    res.render('index',{blogposts})
}