module.exports= (req,res) =>{
   // userInfo
    // Pass> form

    var uname =""
    var email =""
    var username =""
    var password=""

    const data = req.flash('userInfo')[0]

    if(typeof data != 'undefined' ){
        uname = data.txtName
        email = data.txtEmail
        username=data.txtUserName
        password = data.txtPassword
    }

   
    // res.render('register')
   res.render('register',{
   // errors: req.session.ValidationErrors
   errors: req.flash('ValidationErrors'),
   uName :uname,
   email :email,
   userName:username,
   password:password
   })
}