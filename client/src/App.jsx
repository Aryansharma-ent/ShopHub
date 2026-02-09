import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProductDetails from './Pages/ProductDetails'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ShoppingCart from './Pages/ShoppingCart'
import CheckOut from './Pages/CheckOut'
import Profile from './Pages/Profile'
import AdminDash from './Pages/AdminDash'
import MainLayout from './Layouts/MainLayout'
import Products from './Pages/Products'
function App() {
 

  return (
    
      <Routes>
        <Route element = {<MainLayout/>}>
        <Route path='/' element = {<HomePage isHome = {true}  />}/>
        <Route path='/products' element = {<Products/>}/>
        <Route path='/product/:id' element = {<ProductDetails/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/check-out' element = {<CheckOut/>}/>
        <Route path='/cart' element = {<ShoppingCart/>}/>
        <Route path='/Admin' element = {<AdminDash/>}/>
        </Route>
      </Routes>
    
  )
}

export default App
