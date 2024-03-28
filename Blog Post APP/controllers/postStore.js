const path = require('path')
const BlogPost = require('../models/BlogPost')

module.exports=async (req,res)=>{
    //Store image into public/imgs/imagename
    var image = req.files.txtImage

    image.mv(path.resolve(__dirname,'../','public/imgs',image.name))

        const newPost = await BlogPost.create({
            title: req.body.txtTitle,
            description: req.body.txtDescription,
            imagePath:'/imgs/'+image.name,
            userid : req.session.userId
        })
        console.log(`New post Info >>>>> ${newPost}`);
        res.redirect('/')
    //create json
    //create /save into MongoDB
 } 