import React from 'react'

const SearchAnSort = ({search,setSearch}) => {
  return (
      <div className="search-sort-bar">
            <div className="search-box">
              <input type="text" placeholder="Search products..."
              value = {search}
              onChange={(e)=> setSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="sort-box">
              <label>Sort by:</label>
              <select>
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
  )
}

export default SearchAnSort
