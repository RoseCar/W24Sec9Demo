global.loggedIn = null
const port = 4000;
//Module
const express= require('express')
const ejs = require('ejs')
const mongoose= require('mongoose')
const BlogPost = require('./models/BlogPost') 
const fileUpload = require('express-fileupload')
const path = require('path') 
const expressSession = require('express-session') 
const flash = require('connect-flash')

//Controllers::
const homeController = require('./controllers/home')
const contactController = require('./controllers/contact')
const postStoreController = require('./controllers/postStore')  
const loginController = require('./controllers/login')
const registerController = require('./controllers/registre')
const storeUserController = require('./controllers/userStore')
const loginUserController = require('./controllers/userLogin')
const userLogoutController =require('./controllers/logout')
const postByUserController = require('./controllers/postByUser')

//MiddWare:::
const ValidationMiddleware = require('./middlewares/validation')
const authMiddleware = require('./middlewares/authMiddleware')
const redirectIf = require('./middlewares/redirectIfAuthMiddleware')
//Application 
const app = express()
//Mid ware
app.use(express.static('public'))
app.set('view engine','ejs') 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload()) 
app.use(flash())
app.use(expressSession({
    secret:"This is session",
    resave: true,
    saveUninitialized:true
}))
app.use('*',(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

const Validation = (req,res,next)=>{
    console.log('Miidware called!!!')
    next()
}

app.use(Validation)
// Connection to MongoDB
try{
    const connectionString = 'mongodb+srv://F23FullStack:vU0onvCHH5gKogkT@cluster0.p1tk2rw.mongodb.net/'
    mongoose.connect(connectionString)
}
catch(err){

    console.log('MongoDb Not Connected!!!')
}
//get Routes: 
// 1. index or root
app.get('/',homeController)
//2.Contact
app.get('/contact',contactController)
//3.About
app.get('/about',(req,res)=>{
    res.render('about')
})
//5. get route for create a post:
app.get('/post/new',authMiddleware,(req,res)=>{
   // if(req.session.userId){
       return res.render('create',{
        createPost : true
       })
   // }
   // res.redirect('/login')
})
//4.post page 
app.get('/post/:id',async(req,res)=>{
   const post = await BlogPost.findById(req.params.id)
    res.render('post',{post})
})


app.get('/notes',(req,res)=>{
    res.render('notes')
})
// postby user :::

app.get('/post/user/:id',postByUserController)

app.get('/register',redirectIf,registerController)

app.get('/login',redirectIf,loginController) 

app.get('/logout',userLogoutController)
app.post('/user/login',redirectIf,loginUserController)

//6. Post route for create a post

app.post('/post/store',authMiddleware,postStoreController)

app.post('/user/store',redirectIf,storeUserController) 

app.use((req,res)=>{
    res.render('notFound')
})
/*
// 1. Index
    app.get('/',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'pages/index.html'))
    })

// 2. about
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/about.html'))
})

// 3. contact
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/contact.html'))
})

// 4. post
app.get('/post',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/post.html'))
})
*/

//
app.listen(port,()=>{
    console.log(`Appliaction Link : ${port}`)
})
