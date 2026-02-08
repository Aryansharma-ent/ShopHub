import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/Userapi'
import {toast} from 'react-toastify'
const Register = () => {
    const navigate = useNavigate()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [cpassword,setCpassword] = useState('')
    const [loading,setLoading] = useState(false)


    const SubmitHandler = async(e) =>{
        e.preventDefault()
            setLoading(true)
        try {
            // Get the response from backend
            const response = await register({
               name,
               email,
               password,
            })

            // Save token to localStorage
            localStorage.setItem('token', response.data.token)
            
            // Save user info to localStorage (optional)
            localStorage.setItem('user', JSON.stringify(response.data))
            
            toast.success('Logged in Successfully')
            setTimeout(() => {
                window.location.href = '/' 
            }, 1000);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if(loading) return <p>Loading......</p>

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Account 🚀</h1>
          <p>Sign up to start your shopping journey</p>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={SubmitHandler}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            </div>

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
                onChange={(e)=>{setEmail(e.target.value)}}
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
                  placeholder="Create a password"
                  required
                      value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button
                  type="button"
                  className="password-toggle"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                      value={cpassword}
                onChange={(e)=>{setCpassword(e.target.value)}}
                />
                <button
                  type="button"
                  className="password-toggle"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="/terms" style={{ color: '#667eea' }}>Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-btn">🔵</button>
            <button className="social-btn">🔴</button>
            <button className="social-btn">⚫</button>
          </div>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
