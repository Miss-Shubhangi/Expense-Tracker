import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNow = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password
      });
      
      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem('currentUser', JSON.stringify(response.data.data));

        toast.loading('Redirecting to dashboard...');

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={loginNow}>
        <h2>Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;


/*import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

     toast.loading('Redirecting to dashboard...')

     setTimeout(()=>{
       window.location.href = '/'
     }, 3000)
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='login-container'>
      <form className="login-form" > 
        <h2>Login</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" onClick={loginNow}>Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
      <Toaster />
    </div>
  )
}

export default Login;*/
