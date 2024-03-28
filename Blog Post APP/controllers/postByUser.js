const BlogPost =  require('../models/BlogPost')

module.exports=async (req,res)=>{

        // data : 

      const blogposts= await BlogPost.find({userid:req.params.id}).populate('userid')
      res.render('postByUser',{blogposts})

}