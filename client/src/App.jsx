import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './Components/Fotter'
import { useAppContext } from './Context/AppContext'
import Login from './Components/Login'
import AllProducts from './Pages/AllProducts'
import ProductCategroy from './Pages/ProductCategroy'
import ProductDetails from './Pages/ProductsDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'





const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");

  const {showUserLogin}=useAppContext()

  return (
    <div>
      {isSellerPath ? null : <Navbar />}

      {showUserLogin ? <Login/> : null }


      <Toaster/>

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:24 xl:32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategroy />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />

        </Routes>
      </div>
     { !isSellerPath && <Footer/>}
    </div>
  )
}

export default App
