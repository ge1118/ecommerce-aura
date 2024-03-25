import './App.scss'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/sharedComponents/ScrollToTop/ScrollToTop'
import Header from './components/sharedComponents/Header/Header'
import Footer from './components/sharedComponents/Footer/Footer'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
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
import FAQPage from './pages/FAQPage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/login' Component={LoginPage}></Route>
          <Route path='/register' Component={RegisterPage}></Route>
          <Route path='/profile' Component={ProfilePage}></Route>

          <Route path='/products/:category?/:subcategory?' Component={ProductsPage}></Route>

          <Route path='/product/:id' Component={ProductDetailsPage}></Route>
          <Route path='/cart/:id?' Component={CartPage}></Route>
          <Route path='/shipping' Component={ShippingPage}></Route>
          <Route path='/payment' Component={PaymentPage}></Route>
          <Route path='/placeorder' Component={PlaceOrderPage}></Route>
          <Route path='/order/:id' Component={OrderPage}></Route>

          <Route path='/faq' Component={FAQPage}></Route>
          <Route path='/about' Component={AboutPage}></Route>
          <Route path='/contact' Component={ContactPage}></Route>

          <Route path='/admin/userlist' Component={UserListPage}></Route>
          <Route path='/admin/user/:id/edit' Component={UserEditPage}></Route>
          <Route path='/admin/productlist' Component={ProductListPage}></Route>
          <Route path='/admin/product/:id/edit' Component={ProductEditPage}></Route>
          <Route path='/admin/orderlist' Component={OrderListPage}></Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
