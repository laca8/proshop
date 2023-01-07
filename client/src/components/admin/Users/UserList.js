import React,{useState} from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { listUser } from '../../../actions/user'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../../Loader/Loader'
import {deleteUser} from '../../../actions/user'
import Message from '../../Message/Message'

const UserList = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userList = useSelector(state => state.userList)
    const {error,loading,users} = userList
    
    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete
  
    useEffect(() =>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }else{
            history.push('/login')
        }
    },[dispatch,userInfo,history,successDelete])
    const deleteHandler = (id) =>{
       if(window.confirm('are you sure')){
        dispatch(deleteUser(id))
       }
    }
    return (
        <>
        <h1>Users</h1>
        {loading ? (
          <Loader />
        )  : (
          error ? <Message variant='danger'>{error}</Message> : ( 

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          )
        )}
      </>
    )
}

export default UserList
