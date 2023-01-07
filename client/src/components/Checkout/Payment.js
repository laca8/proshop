import React,{ useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Form,Button,Col} from 'react-bootstrap'
import FormContainer from '../FormContainer/FormContainer'
import { savePaymentMethod } from '../../actions/cart'
import CheckoutStips from './CheckoutStips'

const Payment = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
   
    if (!shippingAddress.address) {
        history.push('/shipping')
      }
    
      const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
      const dispatch = useDispatch()
    
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
      }
    return (
        <FormContainer>
        <CheckoutStips step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
       
        <Col>
        <Form.Check type='radio' label='PayPal a credit card' 
        id='paypal' 
        name='paymentMethod' 
        value='paypal'
         onChange={(e) => setPaymentMethod(e.target.value)}
         checked
         >
         </Form.Check>
        </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>send</Button>
        </Form>
    </FormContainer>
    )
}

export default Payment
