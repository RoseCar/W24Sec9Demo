const User = require('../models/User')
const bcrypt = require('bcrypt')
module.exports= async (req,res) =>{

    
       

        try {
           const findUser = await  User.findOne({userName:req.body.txtUserName})
           if(findUser){
            bcrypt.compare(req.body.txtPassword,findUser.password,(error,same)=>{
                    if(same){
                        req.session.userId =findUser._id 
                        console.log(req.session)
                        console.log('User LoggedIN!!!');
                        return res.redirect('/')
                    }
                    else{
                        console.log('Not valid Password!!')
                       return res.redirect('/login')
                    }
            }) 
            
           }
           else{
            console.log('Not User!!!')
            return res.redirect('/login')
           }

        } catch (error) {
            console.log(error)
             res.redirect('/login')
        }
}