import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <>
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
      </>
  )
}

export default Hero
