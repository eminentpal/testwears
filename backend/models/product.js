const mongoose = require ("mongoose");


const productSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'Please enter product name'],
       trim: true,
       maxLength: [100, "Product name cannot exceed 100 characters "]
   },
   price: {
    type: Number,
    required: [true, 'Please enter product price '],
    maxLength: [20, "Product name cannot exceed 20 characters "],
    default: 0.0
    //this is the default value incase you didnt set price
},

description: {
    type: String,
    required: [true, 'Please enter product description'],
   
},
ratings : {
    type: Number,
    default: 0
},
images: [
    //this public id is the image id{ we are using cloudirary}
  { public_id : {
       type: String,
       required: [true]
   },
   url: {
       type: String,
       required: true
   } 
}
],
category:{
    type: String,
    required: [true, 'Please select category for this product'],
    enum:{
      values:[
          'Electronics',
          'Cameras',
          'Laptops',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Clothes/Shoes',
          'Beauty/Health',
          'Sports',
          'Outdoor',
          'Home'
      ],
      message: 'Please select the correct category for this product'
    }
},

// category:{
//     type: String,
//     required: [true, 'Please select category for this product'],
    
// },

seller:{
    type: String,
    required: [true, "Please enter product seller"]
},

stock: {
    type: Number,
    required : [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0
},

numOfReviews:{
    type: Number,
    default: 0
},

reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
           },
        name:{
            type: String,
            required: true
        },
        rating:{
            type: Number,
            required: true

        },
        comment: {
            type: String,
            required: true
        }
    } 
],

// we add user id to product created
//so we get user that is logged in, this true
//req.user.id check middlewares auth.js
user:{
 type:mongoose.Schema.ObjectId,
 ref: 'User',
 required: true
},

createdAt:{
    type: Date,
    default: Date.now
}

})


module.exports = mongoose.model("Product", productSchema);

