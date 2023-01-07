import {
  PRODUCT_LIST_REQUIST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
   GET_PRODUCT_FAIL,
   GET_PRODUCT_REQUIST,
   GET_PRODUCT_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_RESET,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_RESET,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_SUCCESS,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_RESET,
   PRODUCT_DETAILS_REQUIST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_TOP_REQUEST,
   PRODUCT_TOP_SUCCESS,
   PRODUCT_TOP_FAIL
} from '../actions/types'
const initialState = {

}
export const productListReducer = (state = {products:[]}, action) => {
    const {type,payload} = action
    switch(type){
        case PRODUCT_LIST_REQUIST:
            return{
                ...state,
                loading:true,
                products:[]
            }
        case PRODUCT_LIST_SUCCESS:
            return{
                 loading: false,
                  products:payload.products,
                  pages:action.payload.pages,
                  page:action.payload.page
             }
        case PRODUCT_LIST_FAIL:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state
    }
}
export const productDetailsReducer = (state = {product :{reviews:[]}}, action) => {
    const {type,payload} = action
        switch(type){
            case PRODUCT_DETAILS_REQUIST:
                return {loading: true, ...state}
            case PRODUCT_DETAILS_SUCCESS:
                return {loading:false,product:payload}
            case PRODUCT_DETAILS_FAIL:
                return {loading:false,error:payload}
            default:
                return state
    }
}

export const deleteProductReducer = (state = {}, action) => {
    const {type,payload} = action
        switch(type){
            case PRODUCT_DELETE_REQUEST:
                return {loading: true, ...state}
            case PRODUCT_DELETE_SUCCESS:
                return {loading:false,success:true}
            case PRODUCT_DELETE_FAIL:
                return {loading:false,error:payload}
            default:
                return state
    }
}

export const productCreateReducer = (state = {product:{}}, action) =>{
    const  {type,payload} = action
    switch(type){
        case PRODUCT_CREATE_REQUEST:
            return{
                loading:true
            }
        case PRODUCT_CREATE_SUCCESS:
            return{
                loading:false,
                product:payload,
                success:true
            }
        case PRODUCT_CREATE_FAIL:
            return{
                loading:false,
                error:payload
            }
        case PRODUCT_CREATE_RESET:
            return{
                product:{}
            }
        default:
            return state
    } 
}

export const productUpdateReducer = (state = {product:{}}, action) =>{
    const  {type,payload} = action
    switch(type){
        case PRODUCT_UPDATE_REQUEST:
            return{
                loading:true
            }
        case PRODUCT_UPDATE_SUCCESS:
            return{
                loading:false,
                product:payload,
                success:true
            }
        case PRODUCT_UPDATE_FAIL :
            return{
                loading:false,
                error:payload
            }
        case PRODUCT_UPDATE_RESET:
            return{
                product:{}
            }
        default:
            return state
    } 
}

export const productReviewCreateReducer = (state = { },action) => {
    const {type,payload} = action
    switch(type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false,success:true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false,error:payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state

    }
}

export const productTopRatedReducer = (state = {products:[]}, action) => {
    const {type,payload} = action
    switch(type){
        case PRODUCT_TOP_REQUEST:
            return{
                ...state,
                loading:true,
                products:[]
            }
        case PRODUCT_TOP_SUCCESS:
            return{
                 loading: false,
                  products:payload
             }
        case PRODUCT_TOP_FAIL:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state
    }
}