//Error Hnadler Class
// This error class is use to handle error messages from our backend

// when you see class before a variable name just like below, in js it means we want to start 
//every word with capital letter.

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor )
    }
}
//we will need to create meddleware in order to use the Errorhandler
module.exports =  ErrorHandler 

//jj