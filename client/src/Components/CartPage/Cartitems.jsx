import React, { useState } from 'react'
import { UpdateCart } from '../../api/Cartapi'
const CartItems = ({cartItems,refetchCart}) => {
             const [loading,setLoading] = useState(false)
     
     
    const decrementHandler = async(item) =>{
        if(item.quantity <= 1) return
        setLoading(true)
       try {
        await UpdateCart({
            productId : item.product._id,
           quantity : item.quantity - 1
        })
        await refetchCart()
       } catch (error) {
          console.log(error)
       }finally{
        setLoading(false)
       }
     }



     const incrementHandler = async(item) =>{
        setLoading(true)
        
       try {
        await UpdateCart({
              productId : item.product._id,
           quantity : item.quantity + 1
        })
        await refetchCart();
       } catch (error) {
          console.log(error)
       }finally{
        setLoading(false)
       }
     }



  return (
   <>
    <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                    <p className="item-stock">
                      {item.stock > 0 ? `In Stock (${item.stock} available)` : 'Out of Stock'}
                    </p>
                  </div>
                  
                  <div className="item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => decrementHandler(item)}>-</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => incrementHandler(item)}>+</button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    <p className="total-label">Total:</p>
                    <p className="total-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  
                  <button className="remove-btn">
                    <span>🗑️</span> Remove
                  </button>
                </div>
              ))}
            </div>
   </>
  )
}

export default CartItems
