import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'

import MetaData from "../layout/MetaData"
import { useSelector} from 'react-redux'

import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = ({history}) => {

 const {cartItems, shippingInfo} = useSelector(state => state.cart)
 const { user } = useSelector(state => state.auth)


//Calculate Order PRODUCT_DETAILS_SUCCESS

const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)


// if the price of items d person is buying is greater than 200 dollar the price will be 0 else woll be 25$
const shippingPrice = itemsPrice > 200 ? 0 : 25

 
// tax price is the 0.05% of the item price
const taxPrice = Number ((0.05 * itemsPrice).toFixed(2))

const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)




const processToPayment = () => {
    const data = {
        itemsPrice: itemsPrice.toFixed(2), 
        shippingPrice,
        taxPrice,
        totalPrice
    }

    //sessionStorage is just like local storage but go off when the  browser  is closed

    sessionStorage.setItem('orderInfo', JSON.stringify(data))

    //history.push('/paymentmethod')
}

    return (
        <Fragment>

         <MetaData title={'confirm Order'} />
          <CheckoutSteps shipping  confirmOrder />
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info:</h4>
                <p><b>Name:</b> {user && user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                {cartItems.map(item => (
                    <Fragment>

                  
                <div className="cart-item my-1" key={item.product} >
                    <div className="cartItems">
                        <div >
                            <img src={item.image}alt="Laptop" height="45" width="65" />
                        </div>

                        <div >
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div style={{marginLeft:'10px'}}>
                        <span>{item.quantity} x ${item.price} = <b>{(item.quantity * item.price).toFixed(2)}</b></span>
                        </div>

                    </div>
                </div>
            

                    </Fragment>
                ))}

               

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                 <a  style={{textDecoration: 'none'}} href="/paymentmethod" >   <button  onClick={processToPayment} id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button> </ a>
                    </div>
                </div>
			
			
        </div>
        </Fragment> 
    )
}

export default ConfirmOrder
