import React from 'react'

const SideBar = ({selectedCategory, setSelectedCategory, priceRange, setPriceRange, setSearch}) => {
  return (
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filters">
              <button className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
               onClick={()=> setSelectedCategory('All')}
              >All</button>
              <button className={`category-btn ${selectedCategory === 'Electronics' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Electronics')}
              >
                Electronics</button>
              <button 
                className={`category-btn ${selectedCategory === 'Fashion' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Fashion')}
              >
                Fashion</button>
              <button 
                className={`category-btn ${selectedCategory === 'Home' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Home')}
              >
                Home</button>
              <button 
                className={`category-btn ${selectedCategory === 'Sports' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('Sports')}
              >
                Sports</button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-filters">
              <label className="price-option">
                <input 
                  type="radio" 
                  name="price" 
                  value="all" 
                  checked={priceRange === 'all'}
                  onChange={(e) => setPriceRange(e.target.value)} 
                />
                <span>All Prices</span>
              </label>
              <label className="price-option">
                <input 
                  type="radio" 
                  name="price" 
                  value="under100k" 
                  checked={priceRange === 'under100k'}
                  onChange={(e) => setPriceRange(e.target.value)} 
                />
                <span>Under ₹1,00,000</span>
              </label>
              <label className="price-option">
                <input 
                  type="radio" 
                  name="price" 
                  value="100to150k" 
                  checked={priceRange === '100to150k'}
                  onChange={(e) => setPriceRange(e.target.value)} 
                />
                <span>₹1L - ₹1.5L</span>
              </label>
              <label className="price-option">
                <input 
                  type="radio" 
                  name="price" 
                  value="over150k" 
                  checked={priceRange === 'over150k'}
                  onChange={(e) => setPriceRange(e.target.value)} 
                />
                <span>Over ₹1.5L</span>
              </label>
            </div>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedCategory('All')
              setPriceRange('all')
              setSearch('')
            }}
          >
            Clear All Filters
          </button>
        </aside>
  )
}

export default SideBar
