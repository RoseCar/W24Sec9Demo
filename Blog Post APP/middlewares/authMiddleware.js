const User = require('../models/User')
module.exports =async (req,res,next)=>{

        try{
               const findUser = await User.findOne({_id:req.session.userId})
               if(!findUser){
                console.log('Error: Not found User!!')
                return res.redirect('/')
               }
               next();
        }
        catch(err){
            console.log('Error: Not found User!!')
           return res.redirect('/')
        }
}