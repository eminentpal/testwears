

const ErrorHandler =  require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   
    if(process.env.NODE_ENV === 'DEVELOPMENT '){
        res.status(err.statusCode).json({
            success: false,
            error : err,
            errMessage: err.message,
            stack:err.stack
        })
    }

   else {
        let error = {...err}
 
        error.message = err.message

        //wrong Mongoose Object ID Error
        if(err.kind === "ObjectId") {
            const message = `Resource not found. invalid: ${err.path}`
            error = new ErrorHandler (message, 400)
        }

        //Handling Mongoose Validation ErrorHandler

        if (err.name === "ValidationError"){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

        //Handling moongoose duplicate key error eg same email for reg

        if (err.code === 11000){
          const message = `Duplicate ${Object.keys(err.keyValue)} entered`
          error = new ErrorHandler(message, 400)
        }


        //Handling wrong jwt token error
        if (err.name === "JsonWebTokenError"){
            const message = "JSON web token is invalid. Try again!!!"
            error = new ErrorHandler(message, 400)
        }

         //Handling expired wt token error
         if (err.name === "TokenExpiredError"){
            const message = "Token has expired. Request again!!!"
            error = new ErrorHandler(message, 400)
        }


        res.status(error.statusCode).json({
            success: false,
            message : error.message || "Internal server Error"
        })
    }
   
}


// we separate our production errors fro our development errors.
 

//  const ErrorHandler =  require('../utils/errorHandler')

//  module.exports = (err, req, res, next) => {
//      err.statusCode = err.statusCode || 500;
//      err.message = err.message ||  'Internal Server Error';
//      res.status(err.statusCode).json({
//       success: false,
//          error : err.stack
//  }) ;
         
  
//  }





