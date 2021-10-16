/// this is use to check if user is authenticated or not
const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")

//we create this cus we cant access our cookies at the client side only at backend server
// so we will be authenticating user at the backend instead of at the frontend. This is more secured way to do


exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) =>{
        const {token} = req.cookies
     if(!token) {
         return next (new ErrorHandler ('Login first to access this resource.', 401) )
     }
     else {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//remember we stored d user id on the payload so we use it to find d user
         req.user = await User.findById(decoded.id );


     }

     next()
}

)


//Handling users roles

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            next ( new ErrorHandler(`Role ${req.user.role} is not allowed to access this) resource`, 403) )
        }
        next()
    }
}