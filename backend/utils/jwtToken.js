//this for storing our token in the cookies


//Create and send token and saave in cookies


const sendToken = (user, statusCode, res) => {

//create jwt Token
const token = user.getJwtToken();

    //options for cookies
const options = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
     //this is to  ensure its not easy to access isong javascript code by hackers
    httpOnly: true
    }
 
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken

//24hours 60mins 60 seonds 1000 milliseconds