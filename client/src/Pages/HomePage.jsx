import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'

const HomePage = ({}) => {
  // Sample product data - you'll replace this with API data later
  const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, emoji: '🎧' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, emoji: '⌚' },
    { id: 3, name: 'Running Shoes', category: 'Sports', price: 79.99, emoji: '👟' },
    { id: 4, name: 'Leather Backpack', category: 'Fashion', price: 149.99, emoji: '🎒' },
    { id: 5, name: 'Coffee Maker', category: 'Home', price: 89.99, emoji: '☕' },
    { id: 6, name: 'Yoga Mat', category: 'Sports', price: 29.99, emoji: '🧘' },
    { id: 7, name: 'Sunglasses', category: 'Fashion', price: 59.99, emoji: '🕶️' },
    { id: 8, name: 'Bluetooth Speaker', category: 'Electronics', price: 69.99, emoji: '🔊' },
  ]

  const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👔' },
    { name: 'Home & Living', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
    { name: 'Toys', icon: '🎮' },
  ]

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopHub</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="featured-container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.emoji}</div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <div className="deals-content">
          <h2>Flash Sale! Limited Time Offer</h2>
          <p>Up to 50% off on selected items</p>
          <div className="deals-timer">
            <div className="timer-box">
              <span className="timer-number">12</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-box">
              <span className="timer-number">34</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-box">
              <span className="timer-number">56</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
          <button className="deals-button">View Deals</button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and exclusive offers</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage
