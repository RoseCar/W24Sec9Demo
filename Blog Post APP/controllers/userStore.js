const User = require('../models/User')
module.exports= async (req,res)=>{    
    try {        
           const user = await User.create({
                name: req.body.txtName,
                email: req.body.txtEmail,
                userName: req.body.txtUserName,
                password: req.body.txtPassword
            }) 
            
            console.log('User Added !! >> Info :: >>'+user)
           return res.redirect('/')
    } catch (error) {
    const validationErrors =  Object
                                .keys(error.errors)
                                .map(key=> error.errors[key].message )
       // req.session.ValidationErrors = validationErrors
       req.flash('ValidationErrors',validationErrors)
       req.flash('userInfo',req.body)
        //console.log( req.flash('ValidationErrors'))
        return res.redirect('/register')
    }
}