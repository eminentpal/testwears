import { bindActionCreators } from 'redux';
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, CLEAR_CART_ITEMS } from '../constants/cartConstants'


export const cartReducer = (state = {cartItems: [], shippingInfo: {}}, action) => {
        switch (action.type) {
            case ADD_TO_CART:
                    const item = action.payload;
                    //we find using d id of the product
                    //we check if product exist, note that i.product(this come from product: data.product._id which is the id or from productReducer) we have a product so item.product will have a product  too if sth is fetched true our api in actions
                   const isItemExist = state.cartItems.find(i => i.product === item.product)

                   if(isItemExist){
                      return{
                          ...state,
                          cartItems: state.cartItems.map(i => i.product === isItemExist.product? item : i)
                      }
                   } 
                   else {
                      //...state means whatever that is in the state. Thats spread
                      return{
                          ...state,
                          cartItems: [...state.cartItems, item]
                      } 
                   }
        case REMOVE_ITEM_CART:
            return {

                //i.product represents the product id
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

            case SAVE_SHIPPING_INFO :
                return{
                    ...state,
                    shippingInfo: action.payload
                }

                case CLEAR_CART_ITEMS: 
                return {
                    ...state,
                    cartItems: null
                }
            default:
              return  state;
        }
}