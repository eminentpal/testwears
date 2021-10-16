import React , {useEffect} from 'react'
import { useAlert } from 'react-alert'
import MetaData from "../layout/MetaData"
import {useDispatch, useSelector} from 'react-redux'
import {FlutterWaveButton, useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import {  createOrder, clearErrors } from '../../actions/orderActions'
import PaymentMethod from './PaymentMethod';

import { useHistory } from 'react-router-dom'

 const FlutterPayment = () => {

  const history = useHistory()

    const dispatch = useDispatch()
    const alert = useAlert()
    const { user } = useSelector(state => state.auth)
    const {cartItems, shippingInfo } = useSelector(state => state.cart)
   const { error } = useSelector(state => state.newOrder)
   

   useEffect(() => {

    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
   
   }, [dispatch, alert, error])

   
   //check your order controller  at backend to ensure you pass in the values exactly 
   //how you created order model
   const order = {
    orderItems: cartItems,
    shippingInfo     
}



//remember we stored oderInfo in session, check confirmOrder
const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

if(orderInfo) {
 order.itemsPrice = orderInfo.itemsPrice
 order.shippingPrice = orderInfo.shippingPrice
 order.taxPrice = orderInfo.taxPrice
 order.totalPrice = orderInfo.totalPrice
}

//we have to pass the amount in cent.
// const paymentData = {
//  amount: Math.round(orderInfo.totalPrice * 100)
// }


    
    const config = {
          public_key: "FLWPUBK_TEST-a924a84986919841732c01402a671f8b-X",
          tx_ref: Date.now(),
          amount: order.totalPrice,
          currency: 'NGN',
          payment_options: 'card,mobilemoney,ussd',
          customer: {
            email: user.email,
            phonenumber: '08134807598',
            name: user.name,
          },
          customizations: {
            title: 'Eminent Wears',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
          },
        };

        const handleFlutterPayment = useFlutterwave(config);

       const payWithFlutter =  () => {
            handleFlutterPayment({
              callback: (response) => {
                 console.log(response);
                  if(response.status === 'successful') {
                    order.paymentInfo = {
                     id: response.transaction_id,
                     status: response.status
                    
                 }
               
                 dispatch(createOrder(order))
            
                 history.push('/success') 
                }

                 closePaymentModal() // this will close the modal programmatically
                
              }
              ,
              
              onClose: () => {},
            });
          }


         
      
        // const fwConfig = () => {
        //     handleFlutterPayment(
        //     callback: (response) => {
        //        console.log({response});

        //        closePaymentModal() // this will close the modal programmatically
               
        //        if(response.status === 'successful') {
        //        order.paymentInfo = {
        //         id: response. transaction_id,
        //         status: response.status
               
        //     }
          
        //     dispatch(createOrder(order))
        //     history.push('/success')

           
        //     }
              
        //     },
        //     onClose: () => {},)
           
          
        //   };


      

    return (
        <>
           <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <main className="shadow-lg">
                <h1 className="mb-4">FlutterWave</h1>
                
              
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                onClick =  { payWithFlutter }
                >
                  Pay
                </button>

                <PaymentMethod payWith={payWithFlutter} />
    
              </main>
			  </div>
        </div> 
        </>
    )
}

export default FlutterPayment
