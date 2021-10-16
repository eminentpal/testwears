const Product = require ('../models/product')
const dotenv = require ('dotenv');
const connectDatabase = require ("../config/database")
const products = require ('../data/products')


// setting dotenv file
//remeber this is just seedrr to help add products for testing purpose and wont be needed in front end


dotenv.config({path:'./config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try{

     await Product.deleteMany()
     console.log("Products are deleted");

     await Product.insertMany(products)
     console.log("all products added ")
     process.exit()

    } catch(error){
      console.log(error.message)
      process.exit()
    }

}

seedProducts()