import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer,deleteProductReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from './reducers/product'
import { userLoginReducer ,registerReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/user'
import {orderCreateReducer,oredrDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducers/order'
import {cartReducer} from './reducers/cart'
const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer,
  userLogin:userLoginReducer,
  registerR:registerReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  orderCreate:orderCreateReducer,
  orderDetails:oredrDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy:orderListMyReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  productDelete:deleteProductReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  orderList:orderListReducer,
  orderDeliver:orderDeliverReducer,
  productReviewCreate:productReviewCreateReducer,
  productTopRated:productTopRatedReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState = {
   cart: {
     cartItems:cartItemsFromStorage,
     shippingAddress:shippingAddressFromStorage
  },
   userLogin: {userInfo: userInfoFromStorage}

}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store