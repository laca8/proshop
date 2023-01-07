import React,{useEffect, useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import { register } from '../../actions/user'
import FormContainer from '../FormContainer/FormContainer'
const Register = ({history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const registerR = useSelector(state => state.registerR)
    const {error,loading,userInfo} = registerR
    useEffect(() =>{
        if(userInfo){
            history.push('/')
        }
    },[history,userInfo])
    const submitHandler = (e) =>{
        e.preventDefault()
        if(confirmPassword !== password){
            setMessage('password is not matched')
        }else{
            dispatch(register(name,email,password))
        }
       
    }
    return <FormContainer>
    <h1>Sign Up</h1>
    {error && <Message variant='danger'>{error}</Message>  }
    {message && <Message variant="danger">{message}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
            <Form.Label> Name </Form.Label>
            <Form.Control 
            type="text" placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}>

            </Form.Control>
            </Form.Group>
    
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
        <Form.Group controlId='confirmPassword'>
            <Form.Label> Confirm password </Form.Label>
            <Form.Control 
            type="password" placeholder='Enter Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}>
                
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant="primary">Sign Up</Button>
    </Form>
    <Row className="py-3">
        <Col>
          Have account ? <Link to={'/login'}>
           Login
          </Link>
        </Col>
    </Row>
</FormContainer>
}
export default Register