import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {
     const [isLoggedIn,setIsloggedin] = useState(false)

     useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setIsloggedin(true)
        }
     },[])

 
  const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  setIsloggedin(false)
  toast.success('Logged out') 
  setTimeout(() => {
    
      window.location.href = '/login'
  }, 1000);
}

  return (
    
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-logo">
          <h1 className="navbar-logo-text">ShopHub</h1>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="navbar-search-input"
          />
          <button className="navbar-search-button">
            🔍
          </button>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Products</Link>
          <Link to="/deals" className="navbar-link">Deals</Link>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart-link">
            <span className="navbar-cart-icon">🛒</span>
            <span className="navbar-cart-badge">3</span>
          </Link>
          
          {isLoggedIn ? (
  // Logged in - show profile button
  <div className="navbar-actions">
    <Link to="/profile" className="navbar-auth-link">Profile</Link>
    <button onClick={handleLogout} className="navbar-auth-button">Logout</button>
  </div>
) : (
  // Not logged in - show login/register
  <div className="navbar-actions">
    <Link to="/login" className="navbar-auth-link">Login</Link>
    <Link to="/register" className="navbar-auth-button">Sign Up</Link>
  </div>
)}
        </div>
      </div>
    </nav>
  )
}

  

export default Navbar
