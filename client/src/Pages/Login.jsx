import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'
import { useState } from 'react';
import { login } from '../api/Userapi';
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
     const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false);


    const SubmitHandler = async(e)=>{
        e.preventDefault()

        setError('')

        if(!email.includes('@')){
            setError('Please enter a valid email')
            return
        }

          if(password.length < 6) {
       setError('Password must be at least 6 characters')
        return
        }



         setLoading(true)

         try { 

        const response = await login({
         email,
         password
        })    

            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data))

            toast.success('Logged in Successfully')
            setTimeout(() => {
                window.location.href = '/' 
            }, 1000);

         } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.')
            console.log(error)
         }finally{
            setLoading(false)
         }
        
    }


  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back! 👋</h1>
          <p>Login to your account to continue shopping</p>
        </div>

        <div className="auth-body">
          <form className="auth-form"  onSubmit={SubmitHandler}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  required
                       value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                >
                  👁️
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>

          
         {error && <div className="error-message">{error}</div>}

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-btn">🔵</button>
            <button className="social-btn">🔴</button>
            <button className="social-btn">⚫</button>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
