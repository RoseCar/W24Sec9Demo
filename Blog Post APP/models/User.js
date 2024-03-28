const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name  cant not be empty!!!']        
    },
    email:String,
    userName:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
}) 
UserSchema.plugin(uniqueValidator)

UserSchema.pre('save',function(next){
    const user = this 
    bcrypt.hash(user.password ,5,(error,hash)=>{
            user.password= hash
            next()
    } )
})

const User = mongoose.model('User',UserSchema)
module.exports = User