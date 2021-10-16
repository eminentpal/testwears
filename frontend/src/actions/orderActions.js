import axios from 'axios';

import {
    CREATE_ORDER_REQUEST ,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDERS_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS 
} from '../constants/orderConstants';




export const createOrder =  (order) => async (dispatch, getState) => {
     try {

      dispatch({ type: CREATE_ORDER_REQUEST})
       
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

     console.log(order)

      const { data } = await axios.post('/api/v1/order/new', order, config)
      
      console.log(data)
      dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: data

          
      })

     } catch(error) {
  
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
     }
}

//update order

export const updateOrder =  (id, orderData) => async (dispatch) => {
    try {

     dispatch({ type: UPDATE_ORDER_REQUEST})
      
     const config = {
         headers: {
             'Content-Type': 'application/json'
         }
     }

   

     const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)
     
 
     dispatch({
         type: UPDATE_ORDER_SUCCESS,
         payload: data.success

         
     })

    } catch(error) {
 
       dispatch({
           type: UPDATE_ORDER_FAIL,
           payload: error.response.data.message
       })
    }
}


//delete order by admin

export const deleteOrder = (id) => async (dispatch) => {
    try {
     dispatch ({type: DELETE_ORDER_REQUEST})
 
     const {data } = await axios.delete(`/api/v1/admin/order/${id}`)
 
     dispatch({ 
         type: DELETE_ORDER_SUCCESS,
         payload: data.success
     })
    } catch (error) {
        
     dispatch({
            type: DELETE_ORDER_FAIL,
            error: error.response.data.message
        })
     }
 
 }
 

//get currenly logged in users orders

export const myOrders = () => async (dispatch) => {
   try {
    dispatch ({type: MY_ORDERS_REQUEST})

    const {data } = await axios.get('/api/v1/orders/me')

    dispatch({ 
        type: MY_ORDERS_SUCCESS,
        payload: data.orders
    })
   } catch (error) {
       
    dispatch({
           type: MY_ORDERS_FAIL,
           error: error.response.data.message
       })
    }

}


//Get All Orders by Admin only 
export const allOrders = () => async (dispatch) => {
    try {
     dispatch ({type: ALL_ORDERS_REQUEST})
 
     const {data } = await axios.get(`/api/v1/admin/orders/`)
 
  
 
     dispatch({ 
         type: ALL_ORDERS_SUCCESS,
         payload: data
     })
    } catch (error) {
        
     dispatch({
            type: ALL_ORDERS_FAIL,
            error: error.response.data.message
        })
     }
 
 }

 //Get Ordee Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
     dispatch ({type: ORDERS_DETAILS_REQUEST})
 
     const {data } = await axios.get(`/api/v1/order/${id}`)
 

     console.log(data.order)
     dispatch({ 
         type: ORDERS_DETAILS_SUCCESS,
         payload: data.order
     })
    } catch (error) {
        
     dispatch({
            type: ORDERS_DETAILS_FAIL,
            error: error.response.data.message
        })
     }
 
 }

//clear errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}