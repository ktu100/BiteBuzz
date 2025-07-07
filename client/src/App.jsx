import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPages/AboutPage';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import VerifyPayment from './pages/VerifyPayment/VerifyPayment';
import CheckoutPage from './pages/ChecoutPage/CheckoutPage';
import MyOrderPage from './pages/MyOrderPage/MyOrderPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/login' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>

      {/* Payment Verifiy */}
      <Route path='/myorder/verify' element={<VerifyPayment/>}/>
      <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
      <Route path='/checkout' element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
      <Route path='/myorder' element={<PrivateRoute><MyOrderPage/></PrivateRoute>}/>
    </Routes>
  )
}

export default App
