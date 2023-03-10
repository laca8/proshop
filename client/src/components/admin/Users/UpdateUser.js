import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../FormContainer/FormContainer'
import Loader from '../../Loader/Loader'
import { getUserDetails,updateUser } from '../../../actions/user'
import Message from '../../Message/Message'
import {USER_UPDATE_RESET} from '../../../actions/types'
const UpdateUser = ({match,history}) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) =>state.userDetails)
  const {loading,error,user} = userDetails
  
  const userUpdate = useSelector((state) =>state.userUpdate)
  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate
  useEffect(()=>{
    if(successUpdate){
      dispatch({
        type:USER_UPDATE_RESET
      })
      history.push('/admin/userlist')
    }else{
      if(!user.name || user._id !== userId){
      dispatch(getUserDetails(userId))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }

  },[dispatch,userId,user,history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({
      _id:userId,
      name,
      email,
      isAdmin
    }))
  }
    return (
      <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :(

       
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

          <Form.Group controlId='isadmin'>
              <Form.Label> Is Admin </Form.Label>
              <Form.Check
              type="checkbox" placeholder='Enter Email'
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}>
  
              </Form.Check>
          </Form.Group>

       
          <Button type='submit' variant="primary">Update</Button>
      </Form>
       )}
     </FormContainer>
      </>
    )
}

export default UpdateUser
