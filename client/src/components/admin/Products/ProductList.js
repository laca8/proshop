import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../Loader/Loader'
import { deleteProduct, listProducts,createProduct } from '../../../actions/product'
import { PRODUCT_CREATE_RESET } from '../../../actions/types'
import Paginate from '../../Paginate/Paginate'
import Message from '../../Message/Message'
const ProductList = ({history,match}) => {
  const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {products,loading,error,page,pages} = productList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const productDelete = useSelector((state) => state.productDelete)
    const {error:errorDelete,success:successDelete,loading:loadingDelete} = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {error:errorCreate,success:successCreate,loading:loadingCreate,product:createdProduct} = productCreate
    useEffect(() =>{
      dispatch({
        type:PRODUCT_CREATE_RESET
      })
       if(!userInfo && !userInfo.isAdmin){
           history.push('/login')
       }
       if(successCreate){
         history.push(`/admin/product/${createdProduct._id}/edit`)
       }else{
         dispatch(listProducts('',pageNumber))
       }

    },[history,userInfo,dispatch,successDelete,successCreate,pageNumber])
    const deleteHandler = (id) =>{
        dispatch(deleteProduct(id))
    }
    const createProductHandler = () =>{
        if(userInfo){
          dispatch(createProduct())
        }
    }
    return (
        <>
        <Row className='align-items-center'>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Create Product
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        )  : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
          </>
        )}
      </>
    )
}

export default ProductList
