import React,{useEffect, useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import { login } from '../../actions/user'
import FormContainer from '../FormContainer/FormContainer'
const Login = ({history,location}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {error,loading,userInfo} = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message>  }
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label> Email </Form.Label>
            <Form.Control 
            type="email" placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label> password </Form.Label>
            <Form.Control 
            type="password" placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
                
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant="primary">Sign In</Button>
    </Form>
    <Row className="py-3">
        <Col>
          New Customer ?{' '} <Link to={'/register'}>
           Register
          </Link>
        </Col>
    </Row>
</FormContainer>
}
export default Login