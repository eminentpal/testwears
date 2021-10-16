const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const userSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, ' Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your    Password must be longer than 6 characters '],
        // meaning d password wont show when you display user
        select: false
    },
    avatar: {
        // this will come from cloudnary
       public_id :{
          type: String,
          required: false
       },
       url: {
           type: String,
           required: true
       }
    },
    role: {
        type: String,
        default: 'user'

    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date

})

// encrypt password before saving
//pre means before saving we need to do sth
// we check for d modified cus we need to chang password sometimes
userSchema.pre('save', async function (next){
    if (!this.isModified ('password')){
        next()
    } 
    else {
     this.password = await bcrypt.hash(this.password, 10)
    }
})

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password )
}

//Return JWT Token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Generate password reset token

userSchema.methods.getResetPasswordToken = function() {
    // we use crypto to generate random number as token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // we encrypt the token
    //hash and set to resetpasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') 
   

    console.log(this.resetPasswordToken)
    //Set token expire time
    this.resetPasswordExpires = Date.now() + 30 * 60 * 1000

    return resetToken
}


module.exports = mongoose.model('User', userSchema)