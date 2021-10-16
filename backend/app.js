const express = require ("express");
const cors = require ('cors')
const app = express(); 
// const dotenv = require('dotenv')
const path = require('path')

const cookiesParser = require("cookie-parser")
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middlewares/errors')

//setting up config file after getting error from payment at frontend
// dotenv.config({path: "backend/config/config.env"})

if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path: "backend/config/config.env"})

app.use(express.json());
app.use(bodyparser.urlencoded({extended: false} ))
app.use(cookiesParser())
app.use(fileUpload())
app.use(cors());




// export default express

//import all routes

const products = require("./routes/product")
const auth = require('./routes/auth')

const order = require('./routes/order')
const payment = require('./routes/payment')


app.use('/api/v1', products )
app.use('/api/v1', auth )

app.use('/api/v1', order )
app.use('/api/v1', payment )


 
if(process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../Frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Frontend/build/index.html'))
    })
}
 

// middlewares to handle errors
app.use(errorMiddleware)

module.exports = app