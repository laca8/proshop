import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Row,Col } from 'react-bootstrap'
import { listProducts } from '../../actions/product'
import Product from '../Product/Product'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import Paginate from '../Paginate/Paginate'
import ProductCarosel from '../ProductCarosel/ProductCarosel'
import {Helmet} from 'react-helmet'
import Meta from './Meta'
import { Link } from 'react-router-dom'
const Home = ({match}) =>{
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products,page,pages} = productList
  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])
    return(
      <>
      <Meta />
      {!keyword ? <ProductCarosel/> : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      ) }
      <h1>Latest Products</h1>
      {loading ? <Loader/> :error ? <Message variant='danger'>{error}</Message> : (
        <>
               <Row>
               {products.map((product) =>(
                 <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                 <Product product={product}/>
                 </Col>
               ))}
               </Row>
               <Paginate pages={pages} page={page} keyword={keyword ? keyword :''}/>
               </>
               
      )}
  
      </>
    )
}
export default Home
