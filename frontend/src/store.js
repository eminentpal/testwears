import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer, productReducer, newProductReducer, productReviewsReducer, productDetailsReducer, newReviewReducer } from "./reducers/productReducers"
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer,userDetailsReducer  } from './reducers/userReducers'
import { cartReducer } from "./reducers/cartReducers";
import { myOrdersReucer, orderReducer , newOrderReducer, myOrderDetailsReducer, allOrdersReducer} from './reducers/orderReducers'

const reducer = combineReducers({
 products: productsReducer,
 productDetails: productDetailsReducer,
 auth: authReducer,
 user: userReducer,
 allUsers: allUsersReducer,
 userDetails:userDetailsReducer,
 forgotPassword: forgotPasswordReducer,
 cart : cartReducer,
 newOrder: newOrderReducer,
 myOrders: myOrdersReucer,
 orderDetails: myOrderDetailsReducer,
 newReview: newReviewReducer,
 newProduct: newProductReducer,
 product:productReducer,
 productReviews : productReviewsReducer,
 allOrders: allOrdersReducer,
 order: orderReducer,
 
 
})


//bfr we added cart
// let initialState = {}

//after we added cart
let initialState = {
    cart:{
     cartItems: localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) : [],
      shippingInfo:  localStorage.getItem('shippingInfo') 
      ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
}}

const middlware = [thunk]
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middlware)))

export default store;