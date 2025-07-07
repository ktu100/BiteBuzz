import React from 'react'
import Navbar from './components/Navbar'
import {Route,Routes} from 'react-router-dom'
import AddItems from './components/AddItems'
import List from './components/List'
import Order from './components/Order'

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<AddItems/>} />
      <Route path="/list" element={<List />} />
      <Route path="/orders" element={<Order/>} />
    </Routes>
    </>
  )
}

export default App
