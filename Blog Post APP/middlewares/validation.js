module.exports =(req,res,next)=>{

    if(req.body.txtTitle == null || req.files == null){
        console.log('Data Required!!!');
       return res.redirect('/post/new')
    } 
    next()
 }