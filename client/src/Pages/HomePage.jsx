import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'
import { getProduct } from '../api/Productapi'
import Hero from '../Components/HomePage/Hero'
import Product from '../Components/ProductsPage/Product'
import DealsSection from '../Components/HomePage/DealsSection'
import News from '../Components/HomePage/News'

const HomePage = ({isHome}) => {
       const [products,setProducts] = useState([]);
       const [loading,setLoading] = useState(false);
       const [error,setError] = useState('')
       const [categories,setCategories] = useState([])
        

useEffect(()=>{
    setLoading(true)
  const getProducts = async() =>{
    try {
      const res = await getProduct();
      setProducts(res.data);
    } catch (error) {
      setError(error)
    }finally{
      setLoading(false)
    }
  }


  getProducts()
},[]);

useEffect(()=>{

  const uniqueCategories = [...new Set(products.map(p=>p.category))];
  setCategories(uniqueCategories)
},[products])

if(loading)<p>loading......</p>


  return (
    <div className="homepage">
    <Hero/>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{categories.icon}</div>
              <h3 className="category-name">{categories.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <h1 className='text-center'> Featured Products </h1>
   <div className="products-grid">
            {/* Product Card 1 */}
            {products.slice(0,6).map((p)=>(
               <Product key={p._id} product = {p}/>
            ))}   
   </div>
      {/* Deals Section */}
   <DealsSection/>

      {/* Newsletter Section */}
     <News/>
    </div>
  )
}

export default HomePage
