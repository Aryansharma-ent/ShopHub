import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Products.css'
import { getProduct } from '../api/Productapi'
import { useEffect,useState } from 'react'
import ProductComponent from '../Components/ProductsPage/Product'
import SideBar from '../Components/ProductsPage/SideBar'
import SearchAnSort from '../Components/ProductsPage/SearchAnSort'

const Products = () => {
           
          const [products,setProducts] = useState([]);
          const [loading,setLoading] = useState(false);
          const [error,setError] = useState('')

          const [search,setSearch]= useState('')
          const [selectedCategory,setSelectedCategory] = useState('All')
          const [priceRange,setPriceRange] = useState('all')

    useEffect(()=>{
         setLoading(true)
      const getProducts = async() =>{
        try {
           const res = await getProduct()
           setProducts(res.data);
        } catch (error) {
          setError(error);
        }finally{
          setLoading(false)
        }
      }

      getProducts()
    },[])

    const filteredProducts = products.filter(product=>{

      const matchesSearch = product.name .toLowerCase() .includes(search.toLowerCase())
      
      const matchcategory = selectedCategory === 'All' || product.category === selectedCategory

      let matchPrice = true
      if(priceRange === 'under100k') matchPrice = product.price < 100000
      if(priceRange === '100to150k') matchPrice = product.price >= 100000 && product.price <= 150000
      if(priceRange === 'over150k') matchPrice = product.price > 150000

        return matchesSearch && matchPrice && matchcategory;
    })


    if(loading) return <p>Loading.....</p>

    if(error) return <p>Error occcured</p>




  return (
    <div className="products-page">
      <div className="products-container">
        {/* Sidebar Filters */}
        <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSearch={setSearch}
        />
        {/* Main Content */}
        <main className="products-main">
          {/* Header */}
          <div className="products-header">
            <h1>All Products</h1>
            <p className="results-count">{filteredProducts.length} Products were found</p>
          </div>

          {/* Search and Sort Bar */}
              <SearchAnSort
              search={search}
              setSearch={setSearch}
              />

          {/* Products Grid */}
          <div className="products-grid">
            {/* Product Card 1 */}
            {filteredProducts.map((p)=>(
               <ProductComponent key={p._id} product = {p}/>
            ))}          

            
          </div>
        </main>
      </div>
    </div>
  )
}

export default Products

