import React from 'react'

const DealsSection = () => {
  return (
    <>
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
    </>
  )
}

export default DealsSection
