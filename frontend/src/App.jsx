import './App.css'

import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' Component={HomePage}></Route>
            <Route path='/login' Component={LoginPage}></Route>
            <Route path='/register' Component={RegisterPage}></Route>
            <Route path='/profile' Component={ProfilePage}></Route>
            <Route path='/product/:id' Component={ProductPage}></Route>
            <Route path='/cart/:id?' Component={CartPage}></Route>
            <Route path='/shipping' Component={ShippingPage}></Route>
            <Route path='/payment' Component={PaymentPage}></Route>
            <Route path='/placeorder' Component={PlaceOrderPage}></Route>
            <Route path='/order/:id' Component={OrderPage}></Route>

            <Route path='/admin/userlist' Component={UserListPage}></Route>
            <Route path='/admin/user/:id/edit' Component={UserEditPage}></Route>
            <Route path='/admin/productlist' Component={ProductListPage}></Route>
            <Route path='/admin/product/:id/edit' Component={ProductEditPage}></Route>
            <Route path='/admin/orderlist' Component={OrderListPage}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
