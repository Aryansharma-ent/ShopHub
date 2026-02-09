import React from 'react'

const News = () => {
  return (
    <>
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
    </>
  )
}

export default News
