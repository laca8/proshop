import './App.css';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Home/Header';
import Footer from './components/Home/Footer'
import Home from './components/Home/Home';
import ProductScreen from './components/Product/ProductScreen'
import CartScreen from './components/Cart/CartScreen';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import Shipping from './components/Checkout/Shipping'
import Payment from './components/Checkout/Payment';
import PlaceOrder from './components/Checkout/PlaceOrder';
import Order from './components/Order/Order'
import UserList from './components/admin/Users/UserList';
import UpdateUser from './components/admin/Users/UpdateUser';
import ProductList from './components/admin/Products/ProductList';
import ProductEdit from './components/admin/Products/ProductEdit'
import OrderList from './components/admin/order/OrderList';
const  App = () =>  {
  return (
      <Router>
       <Header/>
       <main className='py-3'>
         <Container>
         <Route path='/' exact component={Home}/>
         <Route path='/search/:keyword' exact component={Home}/>
         <Route path='/page/:pageNumber' exact component={Home}/>
         <Route path='/search/:keyword/page/:pageNumber' exact component={Home}/>
         <Route path='/login' exact component={Login}/>
         <Route path='/profile' exact component={Profile}/>
         <Route path='/register' exact component={Register}/>
         <Route path='/product/:id' exact component={ProductScreen}/>
         <Route path='/cart/:id?'  exact component={CartScreen}/>
         <Route path='/shipping' exact component={Shipping}/>
         <Route path='/payment' exact component={Payment}/>
         <Route path='/placeorder' exact component={PlaceOrder}/>
         <Route path='/order/:id' exact component={Order}/>
         <Route path='/admin/userlist' exact component={UserList}/>
         <Route path='/admin/productlist' exact component={ProductList}/>
         <Route path='/admin/productlist/:pageNumber' exact component={ProductList}/>
         <Route path='/admin/orderlist' exact component={OrderList}/>
         <Route path='/admin/user/:id/edit' exact component={UpdateUser}/>
         <Route path='/admin/product/:id/edit' exact component={ProductEdit}/>
         </Container>
         </main>
       <Footer/>
    </Router>

  );
}

export default App;
