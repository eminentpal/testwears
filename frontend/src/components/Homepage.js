import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBox } from '@fortawesome/free-solid-svg-icons';
import { getAdminProducts} from "../actions/productActions"
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert'
const Homepage = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, products, error} = useSelector(state =>  state.products)


    useEffect(() => {
        if(error){
            alert.error(error)
        }
        dispatch(getAdminProducts())
    }, [dispatch])
    

const totalProducts = products?.slice(0, 4)

console.log(totalProducts)

// products.fil(product => {
//     if(product.stock <= 0) {
//         outOfStock += 1;
//     }
    
// })



   return ( <Fragment>

      {/* <!---offer--> */}
  <div class="headerBig ">
      
          <div class=" col-header">
              <p> Exclusive EminentWears</p>
              <h1>Best Online Store</h1>
              <small  class="rowMain">
                  The  top quality wears you can ever find. Our products are relatively cheap and with 30 days return guaranteed. 
                  
              </small>
             <span> <Link to="/products" class="btnn">Explore Now &#8594; </Link></span>
              
        
      </div>
  </div>

{/*   
    <div class="header"> 
    <div class="container">
        
     
     
        <div class="rowMain">
           <div class="col-2">
                <h1> Give Your Workout <br/>
                     A New Style!</h1>
                     <p>Success isnt always about greatness. Its about
                          consistency. Consistent. <br/> Hard work gains success. 
                        Greatness will come.</p>
                        <Link to="/products" class="btnn">Explore Now &#8594; </Link>
            </div>
           <div class="col-2">
           <img src="images/image1.png" />
          </div>
        </div>
    </div>
</div> */}

        {/* categories */}
<div class="categories">
       <div class="small-container">
       <h2 class="title" >Why shop with us?</h2>
        <div class="rowMain">
       
            <div class="col-3 col-fix">
            <span> <FontAwesomeIcon icon={faBox} /> </span>
            <h5> Free shipping </h5>
            <p>on all orders over $99 USD</p>
        
            </div>

            <div class="col-3 col-fix">
           <span> <i class="fa fa-credit-card"></i></span>
            <h5> Secure Checkout </h5>
            <p>with credit and debit card</p>
           
            </div>

            <div class="col-3 col-fix">
           <span> <FontAwesomeIcon icon={faAward} /></span>
            <h5> 30 Day Return</h5>
            <p>No question asked</p>
          
            </div>

            <div class="col-3 col-fix">
            <span><i class="fa fa-check-circle"></i></span>
            <h5> Great Quality </h5>
            <p>Only high quality product</p>
           
            </div>
                   
        </div>

       </div>
       

   </div>

        {/* featured products */}
       
   <div class="small-container">
       <h2 class="title" >Featured Product</h2>
       <div class="rowMain">
       { totalProducts?.map(product => (
           <div class="col-4" key={product._id} >
              
               <Link to={`/product/${product._id}`}>  <img src={product?.images[0].url}
            alt={product.name} /></Link>
               <Link  style={{textDecoration: 'none'}} to={`/product/${product._id}`}><h4>{product?.name}</h4> </Link>
               <div className="ratings mt-auto">
              <div className="rating-outer ratingIcon">
                <div className="rating-inner" style={{width:`${product.ratings/5 * 100 }%` }} ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviws)</span>
            </div>
               <p> ${product.price}</p>
               
             
           </div>
           )) 
               }
           
       
      
       </div>
       {/* <!----Latest Product--> */}
       {/* <h2 class="title" >Latest Product</h2>
       <div class="rowMain">
        <div class="col-4">
            <img src="images/product-5.jpg" />
            <h4>Red Printed T-shirt</h4>
            <div class="ratingIcon">
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star-o"></i>
            </div>
            <p> $50.00</p>
        </div>
        <div class="col-4">
         <img src="images/product-6.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
         </div>
         <p> $50.00</p>
     </div>
     <div class="col-4">
         <img src="images/product-7.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>
          <i class="fa fa-star-o"></i>
         </div>
         <p> $50.00</p>
     </div>
     <div class="col-4">
         <img src="images/product-8.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>
         </div>
         <p> $50.00</p>
     </div>
    </div>
    <div class="rowMain">
        <div class="col-4">
            <img src="images/product-9.jpg" />
            <h4>Red Printed T-shirt</h4>
            <div class="ratingIcon">
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star-o"></i>
            </div>
            <p> $50.00</p>
        </div>
        <div class="col-4">
         <img src="images/product-10.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
         </div>
         <p> $50.00</p>
     </div>
     <div class="col-4">
         <img src="images/product-11.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>
          <i class="fa fa-star-o"></i>
         </div>
         <p> $50.00</p>
     </div>
     <div class="col-4">
         <img src="images/product-12.jpg" />
         <h4>Red Printed T-shirt</h4>
         <div class="ratingIcon">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>
         </div>
         <p> $50.00</p>
     </div>
    </div>*/}
   </div> 
  
   {/* <!---offer--> */}
  <div class=" offer2b1">
      
          <div class=" col-2b1">
    
              <h1>Highly Trusted Online Store</h1>
              <small  class="rowMain">
                  We are highly trusted and relaible. Have safe and fast delivery of any item you buy with 30 days return guaranteed. 
     
                  
              </small>
              <span><Link to="/products" class="btnn">Shop Now &#8594; </Link></span>
          </div>
    
  </div>
{/* 
  <!----testimonial--> */}
  <div class="testimonial">
      <div class="small-container">
          <div class="rowMain">
            <div class="col-3">
                <i class="fa fa-quote-left"> </i>
                <p> I am pleased with The Mi smart band  4 features a 39.9% larger (Than Mi band 3)
                    Amoled color full-touch display width.</p> 
                    <div class="ratingIcon">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <i class="fa fa-star-o"></i>
                       </div> 
                       <img src="images/user-1.png" alt=""/>
                       <h3>Sean Parker</h3>
              </div>
              <div class="col-3">
                <i class="fa fa-quote-left"> </i>
                <p> I am pleased with The Mi smart band  4 features a 39.9% larger (Than Mi band 3)
                    Amoled color full-touch display width.</p> 
                    <div class="ratingIcon">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <i class="fa fa-star-o"></i>
                       </div> 
                       <img src="images/user-2.png" alt=""/>
                       <h3>Ifeanyi Davies</h3>
              </div>
              <div class="col-3">
                <i class="fa fa-quote-left"> </i>
                <p> I am pleased with The Mi smart band  4 features a 39.9% larger (Than Mi band 3)
                    Amoled color full-touch display width.</p> 
                    <div class="ratingIcon">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <i class="fa fa-star-o"></i>
                       </div> 
                       <img src="images/user-3.png" alt=""/>
                       <h3>Rita Jones</h3>
              </div>
          </div>
          
      </div>
  </div>

{/* <!---Contact Us--> */}
<div class="offer22 ">
      
          {/* <div class="col-2">
            <img src="images/exclusive.png" class="offer-img" />
          </div> */}
          <div class="col-2bb">
             
              <h1>Need Assistance?</h1>
              <small  class="rowMain">
                  Get in touch with us for any complaints or recommendations you have. We will be glad to hear from you.
                  
              </small>
             <span> <Link to="#" class="btnn" style={{backgroundColor: '#175C6B', color: 'white', fontWeight: 'bold'}}>Get in touch </Link></span>
          </div>
      
  </div>
  
  {/* <!-----brands-------> */}
  <div class="brands">
      <div class="small-container">
          <div class="rowMain">
              <div class="col-5">
                  <img src="images/logo-godrej.png" />
              </div>
              <div class="col-5">
                <img src="images/logo-oppo.png" />
            </div>
            <div class="col-5">
                <img src="images/logo-coca-cola.png" />
            </div>
            <div class="col-5">
                <img src="images/logo-paypal.png" />
            </div>
            <div class="col-5">
                <img src="images/logo-philips.png" />
            </div>
          </div>
      </div>
  </div>

   {/* <!---footer---> */}
   <div class="footer">
       <div class="container">
           <div class="rowMain">
               <div class="footer-col-1">
                   <h3> Download Our App</h3>
                   <p> Download our android anf ios mobile</p>
                    <div class="app-logo">
                        <img src="images/play-store.png" />
                        <img src="images/app-store.png" />
                        
                    </div>
                </div>
               <div class="footer-col-2">
                <img src="images/logo-white.png" />
                <p> Our purpose is to ensure to have the best experiece
                    and benefits
                </p>
            </div>
            <div class="footer-col-3">
                <h3> Useful links</h3>
                <ul>
                    <li>Coupons</li>
                    <li>Blog post</li>
                    <li>Return Policy</li>
                    <li>Join Affiliates</li>
                </ul>
            </div>
            <div class="footer-col-4">
                <h3> Follow Us</h3>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>Youtube</li>
                </ul>
            </div>
           </div>
           <hr/>
           <p class="Copyright" >Copyright 2020 - Easy Tutorials</p>
       </div>
   </div>

</Fragment>
   )
}

export default Homepage
