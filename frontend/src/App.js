
import React, { useEffect, useState } from 'react'
import "./App.css";
import Footer from './components/layout/Footer';
import Header from "./components/layout/Header"
import HeaderB from "./components/layout/HeaderB"
import Home from "./components/Home"
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login'
import Register from './components/user/Register'

import { loadUser } from './actions/userActions'
import store from './store'

//Auth or User Imports
import Profile from './components/user/Profile';
import ProtectedRoute from './route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Carts and orders
import Cart from './components/cart/Cart';
import Payment from './components/cart/Payment';
import Shipping from './components/cart/Shipping';
import ListOrders from './components/order/ListOrders';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';
import FlutterPayment from './components/cart/FlutterPayment';
import PaymentMethod from './components/cart/PaymentMethod';
import OrderDetails from './components/order/OrderDetails';


//Admin imports

import Dashboard from './components/admin/Dashboard';
import { ProductsList } from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Offline from './components/cart/Offline';
import Homepage from './components/Homepage';
import CartB from './components/cart/CartB';



function App()  {

// const location = useLocation()


  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  const [stripeApiKey, setStripeApiKey] = useState('')

  //this helps fetch the user details anyhere we are in d app so that if we refresh d user will stay logged in
useEffect(() => {
 store.dispatch(loadUser())

 async function getStripeApiKey(){
  
  const { data } = await axios.get('/api/v1/stripeapi')
   setStripeApiKey(data.stripeApiKey)

  
 }




 getStripeApiKey()
}, [])


//  const [toggle, setToggle] = useState(false)

//  const Clicked = () => {
//    setToggle(!true  )
//  }

//  console.log(toggle)




// fix payment and success page showing even when cart is empty
return (

  <Router>
  <div>


 <HeaderB />
 <Route path="/" exact component={Homepage} />
  <div className="container container-fluid" >
  <Route path="/products" exact component={Home} />
  
  <Route path="/search/:keyword" component={Home} />
  <Route path= "/product/:id" exact component ={ ProductDetails} />

  <Route path="/cart" exact component={Cart} />
  <Route path="/cartb" exact component={CartB} />
   <ProtectedRoute  path="/shipping" exact   component={Shipping}  />
   <ProtectedRoute  path="/order/confirm" exact   component={ConfirmOrder}  />
   <ProtectedRoute  path="/success" exact   component={OrderSuccess}  />
    <ProtectedRoute  path="/paymentmethod" exact   component={ navigator.onLine ? PaymentMethod : Offline}  /> 
   <ProtectedRoute  path="/orders/me" exact   component={ListOrders}  />
{/* DONT USE THE WORD exact in ROUTE IF IT HAS ID */}
   
   <ProtectedRoute  path="/order/me/:id"   component={OrderDetails}  /> 
   
   
   <ProtectedRoute  path="/flutterpayment" exact   component={FlutterPayment}  />

   {  stripeApiKey && 
      <Elements stripe = { loadStripe(stripeApiKey)}>
      <ProtectedRoute  path="/payment" exact   component={Payment}  />
      </Elements>
   }
   
  <Route path="/login" exact   component={Login}  />
  <Route path="/register" exact   component={Register}  />
 <ProtectedRoute  path="/me" exact   component={Profile}  />
 <ProtectedRoute  path="/me/update" exact   component={UpdateProfile}  />
 <ProtectedRoute  path="/password/update" exact   component={UpdatePassword}  />
 

 <Route path="/password/forgot"  component={ForgotPassword} />
 <Route path="/password/reset/:token"   component={NewPassword}  />

 
  </div>
   {/* adding the isAdmin helps to differentiate d diffrent protected route */}
 <ProtectedRoute  path="/dashboard" exact  isAdmin={true}   >
  <Dashboard  />
</ProtectedRoute>
 <ProtectedRoute  path="/admin/products" exact  isAdmin={true} component={ProductsList}  />
 <ProtectedRoute  path="/admin/product/" exact  isAdmin={true} component={NewProduct}  />
 <ProtectedRoute  path="/admin/product/:id" exact  isAdmin={true} component={UpdateProduct}  />
 <ProtectedRoute  path="/admin/orders/" exact  isAdmin={true} component={OrdersList}  />
 <ProtectedRoute  path="/admin/order/:id" exact  isAdmin={true} component={ProcessOrder}  />
 <ProtectedRoute  path="/admin/users" exact  isAdmin={true} component={UsersList}  />
 <ProtectedRoute  path="/admin/user/:id" exact  isAdmin={true} component={UpdateUser}  />
 <ProtectedRoute  path="/admin/reviews" exact  isAdmin={true} component={ProductReviews}  />
{/* { !loading && (!isAuthenticated || user?.role !== 'admin') &&  (
  <Footer />
)}  */}
 
  </div>
  </Router>

);

}

export default App;
