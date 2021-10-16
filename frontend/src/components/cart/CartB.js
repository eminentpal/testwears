import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'
import MetaData from "../layout/MetaData"
import {useDispatch, useSelector} from 'react-redux'
import { addItemCart, removeItemCart  } from "../../actions/cartActions";
const CartB = ({history}) => {
 
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)



    

    const increaseQty = (id, quantity, stock) => {
    
       const newQty = quantity + 1      
        if (newQty > stock) return;
      
      else{
      dispatch(addItemCart(id, newQty))
      }
       
      }
      
      // remember the id, stock and quantity comes from the 
      // cartItems.map() done  below where the function is called and item.quantity, item.product were passed 
      //i.e decreaseQty(item.quantity, item.product) so item.product represents the id
      const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1      
        if (newQty <= 0) return;
      
      else{
          dispatch(addItemCart(id, newQty))
      }
      }

      const checkoutHandler = () => {
          history.push('/login?redirect=shipping')
      }

    return (
        <Fragment>
        <MetaData title="Your Cart" />
         
        
        
            
  
    <div class="small-container cart-page">
    {cartItems.length === 0 ? <h2 className='mt-5' style={{color:'red'}} >Your Cart Is Empty</h2> : (
             <Fragment>
               <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
    
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
        {
            cartItems.map(item => (
        <tr key={item.product} >
        
            <td>
                <div class="cart-info">
                    <img src={item.image} alt='product image' />
                    <div className="cart-info1">
                        <Link to={`/products/*${item.product}`}><p>{item?.name} </p></Link>
                        <small>Price: ${item?.price}</small>
                        <br/>
                        <i id="delete_cart_item" onClick={()=> dispatch(removeItemCart (item.product)) } className="fa fa-trash btn btn-danger"></i>
                    </div>
                </div>
            </td>
            <td>  
            <div className="stockCounter ">
            <span onClick={() => decreaseQty( item.product, item.quantity)} className="btn btn-danger minus">-</span>
                            <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                            <span onClick={() => increaseQty( item.product, item.quantity, item.stock)} className="btn btn-primary plus">+</span>
                            </div>
                            </td>
            <td>${item?.price}</td>
        </tr>


            ))}
        </table>
<div class="total-price">
    <table>
        <tr>
            <td> Subtotal</td>
            <td>{cartItems.reduce((acc , cartItem) => acc + cartItem.quantity, 0)} (Units)</td>
        </tr>
       
        <tr>
            <td>Est. total</td>
            <td>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</td>
        </tr>
        <span> <button id="checkout_btn" style={{margin:'10px 50px'}}  onClick={checkoutHandler}  className="btn btn-primary btn-block"> Check out</button></span>
    
    
    </table>
    
  
</div>
</Fragment>
  )}

    </div>
    
            
          
        </Fragment>
    )
}

export default CartB

{/* <div className="row d-flex align-items-center">

<div className="col-12 col-lg-3 my-4">
    <div id="order_summary">
        <h4>Order Summary</h4>
        <hr />
        //this was commented out
        remember we used reducer to manage d state thats why we use reducer(acc, item) .. googleit
            toFixed(2) helps to keep the value after decimal to only two numbers eg 90.99 instead of 90.9976.. this was formally Number(cartItem.quantity)
                const reducer = (accumulator, currentValue) => accumulator + currentValue, 0;
                acc is the accumulator and currentValue is the cartItem and in it we are targetting d quantity. and you can set it to increase by anytin, but we set 0 cus we have a reducer that increases d qtn for us when we increase d qty
            putting d ,0 is compulsory
        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc , cartItem) => acc + cartItem.quantity, 0)} (Units)</span></p>
        <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

        <hr />
        <button id="checkout_btn"   onClick={checkoutHandler}  className="btn btn-primary btn-block"> Check out</button>
    </div>
</div>
</div> */}
