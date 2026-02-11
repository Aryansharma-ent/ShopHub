import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addCart } from '../../api/Cartapi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Product = ({product}) => {
         const navigate = useNavigate()
       const [loading,setLoading] = useState(false);
       const [error,setError] = useState(false)
  
   
       const addHandler = async() =>{
         
         const token = localStorage.getItem('token')
         if(!token){
           navigate('/login')
           return
          }
          
          
          setLoading(true)
          try {
            const res = await addCart({
              productId : product._id,
              quantity : 1
      }) 
      toast.success('Product added to cart!')
      
    } catch (error) {
      setError(true)
    }finally{
      setLoading(false)
    }
   }

   if(loading) <p>adding to Cart</p>
   if(error)<p> error adding product to cart</p>




  return (
     <div className="product-card">
              <Link to={`/products/${product._id}`} className="product-image">
                <div className="image-placeholder">
                   <img
          className="product-img"
          src={product.image?.[0]}
          alt={product.name}
          loading="lazy"
        />
                </div>
              </Link>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link to={`/products/${product._id}`}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-rating">
                  <span className="stars">⭐⭐⭐⭐</span>
                  <span className="rating-value">{product.rating}</span>
                </div>
                <div className="product-footer">
                  <p className="product-price">${product.price}</p>
                  <button className="add-to-cart-btn" onClick={addHandler}>🛒 Add to Cart</button>
                </div>
              </div>
            </div>
  )
}

export default Product
