import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
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
                  <button className="add-to-cart-btn">🛒 Add to Cart</button>
                </div>
              </div>
            </div>
  )
}

export default Product
