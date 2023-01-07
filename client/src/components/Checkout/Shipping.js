import React,{useEffect, useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../FormContainer/FormContainer'
import { saveShippingAddress } from '../../actions/cart'
import CheckoutStips from './CheckoutStips'
export const Shipping = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
  
    const dispatch = useDispatch()
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push('/payment')
    }
    return <FormContainer>
        <CheckoutStips step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Label> address </Form.Label>
            <Form.Control 
            type="text" placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}>

            </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
            <Form.Label> city </Form.Label>
            <Form.Control 
            type="text" placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}>

            </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
            <Form.Label> postalCode </Form.Label>
            <Form.Control 
            type="text" placeholder='Enter postalCode'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}>

            </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
            <Form.Label> country </Form.Label>
            <Form.Control 
            type="text" placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}>

            </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>send</Button>
        </Form>
    </FormContainer>
}
export default Shipping
