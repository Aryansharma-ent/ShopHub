import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ShoppingCart.css'
import { getCart } from '../api/Cartapi'
import Card from '../Components/CartPage/CartItems'

const ShoppingCart = () => {
  // Dummy cart data for UI display
      const [cartdata,setCartdata] = useState([]);
      const [loading,setLoading] = useState(false)


 const fetchCart = async() => {
    setLoading(true);
    try {
      const res = await getCart();
      setCartdata(res.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


   useEffect(()=>{
     fetchCart();
   },[])

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        {cartdata.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items Section */}
           <Card cartItems={cartdata} refetchCart={fetchCart}/>

            {/* Cart Summary Section */}
            {/* <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>₹{shipping.toLocaleString()}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              
              <Link to="/products" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
