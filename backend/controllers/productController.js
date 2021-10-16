const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
// const User = require('../models/user');
//we will wrap all our routes using ths catchAsyncErrors so that when we have erros it can catch
//it and display to us.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require ('cloudinary')
const APIFeatures = require('../utils/apiFeatures')




//create new product to the route /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors (async (req, res, next) => {
   
    //remember we are expecting multiple image from frontend but u may decide to use just one image for the post.
    
    let images = []
    //this is done cus if user upload one image it wil
    //be in string, but if its multiple images,
    //it will be in an array.
    //so if its one image we just push to the array
    //but if is multiple images den d let images wil be = to the array of images 
    //the user uploaded.

    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

let imagesLink = [];

for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products'
    })

    imagesLink.push ({
        public_id: result.public_id,
        url: result.secure_url
    })
}

    // this is for currently logged in user
    req.body.images = imagesLink
    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

    //bfr cloudinary was added

    // req.body.user = req.user.id

    // const product = await Product.create(req.body);
    // res.status(201).json({
    //     success: true,
    //     product
    // })
})

// the code before async error catch was added

// exports.newProduct = async (req, res, next) => {
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         product
//     })
// }

// Get all products => /api/v1/products
// Search product => /api/v1/products?keyword=app

//find  by category
// /api/v1/products?keyword=apple&category=Electronics

// find by price
///api/v1/products?keyword=bad&price[gte]=160&price[lte]=200

//this is route for pagination
//{{DOMAIN}}/api/v1/products?page=1

exports.getProducts = catchAsyncErrors (async (req, res, next ) => {


//handle pagination
   const resPerPage = 4;
   const productsCount = await Product.countDocuments()



    //req.query.keyword  shud have been dx way but we craeted apifeature that take in the keyword

    const apiFeatures = new APIFeatures(Product.find(), req.query ) 
    .search()
    .filter()
   
    let products = await apiFeatures.query
    let filteredProductsCount = products.length

    apiFeatures .pagination(resPerPage)


     products = await apiFeatures.query;


    //the pagination was edited cus after searching product d pagination still shows
  //  const apiFeatures = new APIFeatures(Product.find(), req.query ) 
                       // .search()
                        //.filter()
                        //.pagination(resPerPage)

//    const products = await apiFeatures.query;

//    console.log( products)

// setTimeout(()=>{}, 2000)
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
         products
    })

   


//    const products = await Product.find()
//    res.status(200).json({
//       success: true,
//       count: products.length,
//        products
//   })
})


//Get products to be displayed on admin dashboard
// => /api/v1/admin/products

exports.getAdminProducts = catchAsyncErrors (async (req, res, next ) => {

    
        const products = await Product.find();
 
        res.status(200).json({
            success: true,
             products
        })

    })
//Get single product => /api/v1/product/:id


exports.getSingleProduct = catchAsyncErrors ( async (req, res, next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){

        return next(new ErrorHandler ("Product not found", 404))

        // return res.status(404).json({
        //     success: false,
        //     message: "Prdouct not found"

           
        // })
    }
    else{
        res.status(200).json({
            success: true,
            product
        })
    }
})

//Update Product => /api/v1/admin/product/:findById

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
     let product = await Product.findById(req.params.id)

     if(!product){
         // this is our own custom error
        return next(new ErrorHandler ("Product not found", 404))

        //this is the old error type bfr we created middleware error

        // return res.status(404).json({
        //     success: false,
        //     message: "Prdouct not found"
        // })
    }
    else{

         let images = []
    //this is done cus if user upload one image it wil
    //be in string, but if its multiple images,
    //it will be in an array.
    //so if its one image we just push to the array
    //but if is multiple images den d let images wil be = to the array of images 
    //the user uploaded.

    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    if (images !== undefined) {
         //Deleting images associated with the product
       for(let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    
let imagesLink = [];

for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products'
    })

    imagesLink.push ({
        public_id: result.public_id,
        url: result.secure_url
    })
}

    // this is for currently logged in user
    req.body.images = imagesLink
    }

       product  = await Product.findByIdAndUpdate(req.params.id, req.body,{
           new: true,
           runValidators: true,
           useFindAndModify: false 
       });

       res.status(200).json({
           success: true,
           product
       })
    }

    //bfr adding cloudinary image 
    // let product = await Product.findById(req.params.id)

    //  if(!product){
    //      // this is our own custom error
    //     return next(new ErrorHandler ("Product not found", 404))

    //     //this is the old error type bfr we created middleware error

    //     // return res.status(404).json({
    //     //     success: false,
    //     //     message: "Prdouct not found"
    //     // })
    // }
    // else{
    //    product  = await Product.findByIdAndUpdate(req.params.id, req.body,{
    //        new: true,
    //        runValidators: true,
    //        useFindAndModify: false 
    //    });

    //    res.status(200).json({
    //        success: true,
    //        product
    //    })
    // }
})

//Delete Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product){

        return next(new ErrorHandler ("Product not found", 404))
    //    return res.status(404).json({
    //        success: false,
    //        message: "Prdouct not found"
    //    })
   }
   else{
       //Deleting images associated with the product
       for(let i = 0; i < product.images.length; i++) {
           const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
       }

     await product.remove()

      res.status(200).json({
          success: true,
          message: "Product deleted successfully"
      })
   }
})


//REVIEWWWWWWSSSSS

//create new review => /api/v1//review

exports.createProductReview = catchAsyncErrors (async (req, res, next) => {
    const {rating, comment, productId} = req.body;

//  const userName = await User.findById(req.user._id);

//  console.log(userName)
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    //fixing name not update
    // const review = {
    //     user: req.user._id,
    //     name: userName.name ,
    //     rating: Number(rating),
    //     comment
    // }

    //this is to update review
    //r stands for review

    const product = await Product.findById(productId);

    //here we check if user has already reviewed the product
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

//if he has reviewed then we update d review else we create a new one

    if(isReviewed){
   product.reviews.forEach(review => {
       if(review.user.toString() === req.user._id.toString()){
           review.comment = comment;
           review.rating = rating;
       }
   })
    }
    else{
       product.reviews.push(review);
       product.numOfReviews = product.reviews.length
    }

    // we add all the ratings and then divide it (i.e / ) by number of reviews
    // the reduce method will reduce multiple values to one value.
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length 

    await product.save({validateBeforSave: false})

    res.status(200).json({
        success: true
    })
})



//Get Product Reviews => /api/v1/reviews


exports.getProductReviews = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.id);

  
    if(!product){

        return next(new ErrorHandler ("Product not found with that ID", 404))
    }

    else {
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    }
    

})


//Delete product review => /api/v1/Reviews



exports.deleteReview = catchAsyncErrors (async (req, res, next) => {

    console.log(req.query)
    const product = await Product.findById(req.query.productId);


const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

// console.log(reviews)
const numOfReviews = reviews.length; 

// console.log(numOfReviews)
const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length 
   
await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
}, {
    new: true,
    runValidators: true,
    useFindAndModify: false
})

res.status(200).json({
        success: true
       
    })
console.log('done')
})




