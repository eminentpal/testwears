// import app from "./app";
// import dotevn from "/dotenv"

const app = require('./app');
const connectDatabase = require ("./config/database")
// const dotenv = require ("dotenv")
const cloudinary = require ('cloudinary')



// Handle uncaught rejection exceptions  error, eg somethn not defined

process.on('uncaughtException', err => {

    // we can use err.message or err.stack
    //console.log(`ERROR: ${err.message}`);
    console.log(`ERROR: ${err.stack}`);
   console.log('Shutting down due  to uncaught exceptions');
   process.exit(1)
})

//setting up config file


// dotenv.config({path: "backend/config/config.env"})
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path: "backend/config/config.env"})

//connect to database

connectDatabase();

//setting up cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})






// app.get("/", function(req, res){
//     res.send("server working")
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle unhandled promise rejection erros
 
process.on('unhandledRejection', err =>{
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to unhandled promise prejection')
    server.close( () => {
        process.exit(1)
    })
})