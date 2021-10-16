const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

const cloudinary = require('cloudinary')

//register a user => /api/v1/register

exports.registerUser = catchAsyncErrors( async (req, res, next) => {
            
    //this is for the avartar image

const profilePicture = req.body.avatar

     if(!profilePicture){
    return next(new ErrorHandler('Please Add Profile Picture', 401));
   
    }


    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    //Pending issue, if an image not selected, internal error happens. fix it
    console.log('cloudinary working')

//with scale we dont have to put the height
         const{name, email, password} = req.body;

         const user = await User.create({
             name,
             email,
             password,
             avatar: {
                 public_id: result.public_id ,
                 url: result.secure_url
             }
         })


         //200 is the statuscode

   sendToken(user, 200 ,res)


//before adding cookies  

        //  const token = user.getJwtToken();
        //      res.status(201).json({
        //      success: true,
        //      token
        //  })


        //this was bfr adding token

        //  res.status(201).json({
        //      success: true,
        //      user
        //  })
})


//Login user => /api/v1/login

exports.loginUser = catchAsyncErrors( async (req, res, next) =>{
    
    const { email, password} = req.body
        //we check if email and password entered by user
    if(!email || !password ){
        return next(new ErrorHandler('Please enter email & password', 400))
    }


      // finding user in database
      const user = await User.findOne({email}).select('+password')

      if (!user){
          return next(new ErrorHandler('Invalid Email or Password', 401));
      }

      // checks if password is correct or not

      const isPasswordMatched = await user.comparePassword(password);

      if(!isPasswordMatched){
          return next(new ErrorHandler('Invalid Email or Password', 401));

         
      }


      sendToken(user, 200 , res)


      //before adding cookies  

    //   const token = user.getJwtToken();




    // res.status(200).json({
    //     success:true,
    //     token
    // })


})


//Forgot Password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})
    console.log('saved')

    // Create reset password url
    //we check the protocol that is https or http
    // we get d host if is local host or custom domain

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

   const messageNow = `Your password reset token is as follow:\n\n${resetUrl}\n\n if you didn't request for change of password, please ignore this email.`
 
   try {

    await sendEmail({
        //this represent the options
        email: user.email,
        subject: 'ShopIt Password Recovery',
        messageNow
    })

    res.status(200).json({
        success: true,
        message: `Email sent to : ${user.email}`
    })

  }
   catch(error){

    //if errror we set these to undefined and den save back d user
      user.resetPasswordToken = undefined;
     user.resetPasswordExpires = undefined 

     await user.save({validateBeforeSave: false})
     return next(new ErrorHandler(error.message, 500))
  }


})


//ResetPassword => /api/v1/password/reset/token

exports.resetPassword = catchAsyncErrors( async (req, res, next) => {
      //hash url token
      const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex')
      const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now()}
      })

      if(!user) {
          return next(new ErrorHandler('Password reset token is invalid or expired', 400))
      }

      else {
          
        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Password does not match', 400))
        }
      }

      //setup new password
      user.password = req.body.password;
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

     await user.save()
    
     sendToken(user, 200, res)

})



//Get currently logged in user => /api/v1/me

exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//update /change password => /api/v1/password/update

exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
//check prev user password
//we created the compare password method in d model
   const isMatched = await user.comparePassword(req.body.oldPassword)  

  if(!isMatched){ 
      return next(new ErrorHandler('Old password is incorrect ', 400))
  }

  user.password = req.body.password
  
  await user.save();
    sendToken(user, 200, res)
})

//update user profile details  => /api/v1/me/update

exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    const newUserData =  {
        name: req.body.name,
        email: req.body.email
    }
  //update avatar:

  //we check if d user has avatar
  if(req.body.avatar !== '') {
      const user = await User.findById(req.user.id)

     const image_id = user.avatar.public_id;

     const res = await cloudinary.v2.uploader.destroy(image_id)

     //this is for the avartar image
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url
    }

  }



  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  }) 
  res.status(200).json({
      success: true
  })

})

//
//Logout user => /api/v1/logout

exports.logout = catchAsyncErrors( async (req, res, next) => {
  
  //two things happen here, logout wehn buttton is clicked
  //all automatic logout when time assigned is expired
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: 'Logged out'
    })
})


//admin routes /////////////ADMIN

//Get all users => /api/v1/admin/users

exports.allUsers = catchAsyncErrors( async (req, res, next) => {
  
    const users = await User.find();

    res.status(200).json({
        sucess: true,
        users
    })
})


//Get a specific user's details => /api/v1/admin/user/:id

exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {
      const user = await User.findById(req.params.id);

      if(!user){
          return next(new ErrorHandler(`User with the id: ${req.params.id} not found)`))
      }

  res.status(200).json({
        sucess: true,
        user
    })

}) 


//update user profile details by admin  => /api/v1/admin/user/:id

exports.updateUser = catchAsyncErrors( async (req, res, next) => {
    const newUserData =  {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })
  res.status(200).json({
      success: true
  })

})


//delete user => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with the id: ${req.params.id} not found)`))
    }

    //remove avata from cloudinary
    
        const image_id = user.avatar.public_id;

         await cloudinary.v2.uploader.destroy(image_id)
    
    

    user.remove()
res.status(200).json({
      success: true,
    
  })

}) 